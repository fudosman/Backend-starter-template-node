const { StatusCodes } = require("http-status-codes");
const {authService} = require('../services');

const sign_up = async function (req, res) {
  console.log("==> inside the signup method.");
  try{
    const {firstname, lastname, email, password } = req.body;
    const user = {
      firstname,
      lastname,
      email, 
      password: hasedpassword,
    };
    const newuser = authService.create(user);
    
    return res.status(StatusCodes.OK).json({
      success: true,
      user: newuser,
      message: "user has been created successfully"
    });
  }catch(error){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: error.message,
    });
  }
};

const login = async function () {

};

module.exports = {
  sign_up,
  login
};