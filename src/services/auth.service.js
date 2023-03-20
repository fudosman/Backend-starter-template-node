const argon2 = require('argon2');
const { v4: uuidv4 } = require('uuid');
const Services = require('./base.service');
const {User} = require('../models');

class AuthService extends Services {
  constructor(User) {
    super(User);
  }

  async createUser({ name, email, password, phoneNumber, gender, country, state }) {
    const hashedPassword = await argon2.hash(password);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      gender,
      country,
      state,
      emailVerificationToken: uuidv4(),
    });
    return user.save();
  }

  async verifyEmail({ email, token }) {
    const user = await this.getQ({ email, emailVerificationToken: token });
    if (!user) throw new Error('Invalid email verification token');
    user.isEmailVerified = true;
    user.emailVerificationToken = null;
    return user.save();
  }

  async resendVerificationEmail(email) {
    const user = await this.getQ({ email });
    if (!user) throw new Error('User not found');
    user.emailVerificationToken = uuidv4();
    return user.save();
  }

  async setPassword({ email, token, password }) {
    const user = await this.getQ({ email, setPasswordToken: token });
    if (!user) throw new Error('Invalid set password token');
    const hashedPassword = await argon2.hash(password);
    user.password = hashedPassword;
    user.setPasswordToken = null;
    const newUser = await user.save();
    return newUser;
  }

  async sendResetPasswordEmail(email) {
    const user = await this.getQ({ email });
    if (!user) throw new Error('User not found');
    user.setPasswordToken = uuidv4();
    await user.save();
    // code to send email with password reset link goes here
  }

  async resetPassword({ email, token, password }) {
    const user = await this.getQ({ email, setPasswordToken: token });
    if (!user) throw new Error('Invalid set password token');
    const hashedPassword = await argon2.hash(password);
    user.password = hashedPassword;
    user.setPasswordToken = null;
    return user.save();
  }

  async changePassword({ userId, oldPassword, newPassword }) {
    const user = await this.get(userId);
    const passwordMatches = await argon2.verify(user.password, oldPassword);
    if (!passwordMatches) throw new Error('Old password does not match');
    const hashedPassword = await argon2.hash(newPassword);
    user.password = hashedPassword;
    return user.save();
  }

  async deleteAccount(userId) {
    const user = await this.get(userId);
    user.isDeleted = true;
    user.deletedAt = new Date();
    return user.save();
  }
}

module.exports = new AuthService(User);
