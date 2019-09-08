const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us you name.'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide your email.'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  photo: String,
  role: {
    type: String,
    enum: ['user', 'admin', 'guide', 'lead-guide'],
    default: 'user'
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [8, 'A user password must have more and equal 8 characters'],
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // only validate only when we save and create.
      validator: function(el) {
        return el === this.password;
      },
      message: 'password dont match confirm password'
    }
  },
  passwordChangedAt: Date
});

userSchema.pre('save', async function(next) {
  // only run this function if password was actually changed.
  if (!this.isModified('password')) return next();

  // hash the password with cost of 12.
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field.
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.correctPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    // False means not changed
    return JWTTimestamp < changedTimestamp;
  }

  return false;
};
const User = mongoose.model('User', userSchema);

module.exports = User;
