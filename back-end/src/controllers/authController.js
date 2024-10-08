const User = require('../models/User');
const generateToken = require('../utils/jwtToken');

// Job Seeker Sign Up
const signUpSeeker = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user with role 'job_seeker'
    user = new User({ firstName, lastName, email, password, role: 'job_seeker' });
    await user.save();

    // Generate JWT token
    const token = generateToken(user._id, user.role);

    res.status(201).json({
      message: 'Job Seeker registered successfully',
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Company Sign Up
const signUpCompany = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'Company already exists' });
    }

    user = new User({ firstName, lastName, email, password, role: 'company' });
    await user.save();

    const token = generateToken(user._id, user.role);

    res.status(201).json({
      message: 'Company registered successfully',
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { signUpSeeker, signUpCompany };