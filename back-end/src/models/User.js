// Set Up User Models
const mongooose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongooose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['job_seeker', 'company'], required: true },
  date: { type: Date, default: Date.now },
});

// Hash the password before saving the user
UserSchema.pre('save', async function (next){
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Verify password match
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongooose.model('User', UserSchema);