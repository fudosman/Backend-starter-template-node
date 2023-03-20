const Joi = require('joi');
const { StatusCodes } = require("http-status-codes");


const userSchema = Joi.object({
  email: Joi.string().email().required(),
  firstname: Joi.string().trim(),
  middlename: Joi.string().trim(),
  lastname: Joi.string().trim(),
  password: Joi.string(),
  phone_number: Joi.string(),
  gender: Joi.string().valid('male', 'female', 'other'),
  country: Joi.string(),
  state: Joi.string(),
  address: Joi.string(),
  dateOfBirth: Joi.date(),
  avatar: Joi.string(),
  userPhoto: Joi.string(),
  isEmailVerified: Joi.boolean(),
  emailVerificationToken: Joi.string().allow(null),
  setPasswordToken: Joi.string().allow(null),
  status: Joi.string().valid('active', 'suspended', 'deleted').default('active'),
});

function validateUser(req, res, next) {
  const { error, value } = userSchema.validate(req.body);
  if (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      error: error.details[0].message
    });
  }
  next();
}

module.exports = validateUser;