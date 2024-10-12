const bcrypt = require('bcryptjs');
const User = require('../models/User');
const generateToken = require('../utils/jwtToken');
const generateEmailToken = require('../utils/emailToken');
const sendConfirmationEmail = require('../utils/nodemailer');

// Job Seeker Sign Up
const signUpSeeker = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const emailToken = generateEmailToken();

    const newUser = new User({
      firstName,
      lastName,
      email,
      password,   // No need to manually hash, the schema will handle it
      role: 'job_seeker',
      emailToken,
      isConfirmed: false,
    });

    await newUser.save();

    // Send confirmation email
    sendConfirmationEmail(email, emailToken);

    res.status(201).json({ message: 'Job Seeker registered. Please check your email for confirmation.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Company Sign Up
const signUpCompany = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const emailToken = generateEmailToken();
    user = new User({
      firstName,
      lastName,
      email,
      password, // Schema will hash it
      role: 'company',
      emailToken,
      isConfirmed: false,
    });

    await user.save();

    sendConfirmationEmail(email, emailToken);

    res.status(201).json({ message: 'Company registered. Please check your email for confirmation.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Email confirmation
const confirmEmail = async (req, res) => {
  const { token } = req.params;

  console.log(`Token received for confirmation: ${token}`);

  try {
    const user = await User.findOne({ emailToken: token });

    if (!user) {
      console.log(`Invalid or expired token: ${token}`);
      return res.status(400).json({ message: 'Invalid or expired token.' });
    }

    user.isConfirmed = true;
    user.emailToken = null;  // Invalidate token after use
    await user.save();

    console.log(`Email confirmed successfully for token: ${token}`);
    return res.status(200).json({ message: 'Email confirmed successfully' });
  } catch (error) {
    console.error('Server error during email confirmation:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Email not found, please sign up!' });
    }

    // Check if the user has confirmed their email
    if (!user.isConfirmed) {
      return res.status(400).json({ message: 'Please confirm your email before logging in.' });
    }

    // Verify the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(user._id, user.role);
    
    console.log(user.role);

    res.json({
      message: 'Login successful',
      token,
      role: user.role,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { signUpSeeker, signUpCompany, login, confirmEmail };