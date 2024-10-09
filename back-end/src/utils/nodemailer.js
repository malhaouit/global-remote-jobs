const nodemailer = require('nodemailer');

// Function to send a confirmation email
const sendConfirmationEmail = (recipientEmail, confirmationToken) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // Or use a custom SMTP service
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail address
      pass: process.env.EMAIL_PASSWORD, // Your Gmail password
    },
  });

  // Email content and confirmation link
  const confirmationUrl = `${process.env.CLIENT_URL}/confirm-email?token=${confirmationToken}`;
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender address
    to: recipientEmail, // Recipient address
    subject: 'Email Confirmation',
    html: `<h2>Welcome to GlobalRemoteJobs!</h2>
           <p>Please confirm your email by clicking the following link:</p>
           <a href="${confirmationUrl}">Confirm your email</a>`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('Error sending email: ', err);
    } else {
      console.log('Confirmation email sent: ', info.response);
    }
  });
};

module.exports = sendConfirmationEmail;