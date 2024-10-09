const crypto = require('crypto');

// Generate email confirmation token
const generateEmailToken = () => {
  return crypto.randomBytes(32).toString('hex');
}

module.exports = generateEmailToken;