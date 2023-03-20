const { StatusCodes } = require("http-status-codes");
const { profileService } = require('../services');
const { User } = require('../models');


const editProfile = async function (req, res) {
  try {
    const { firstname, lastname, age, sex, state, country } = req.body;

    let changedInstances = [];

    if (firstname) {
      const changedFirstName = profileService.changeFirstname(firstname);
      changedInstances.push(changedFirstName);
    }
    if (lastname) {
      const changedLastname = profileService.changeLastname(lastname);
      changedInstances.push(changedLastname);

    }
    if (age) {
      const changedAge = profileService.changeAge(age); 
      changedInstances.push(changedAge);

    }
    if (sex) {
      const changedSex = profileService.changeSex(sex); 
      changedInstances.push(changedSex);

    }
    if (state) {
      const changedState = profileService.changeState(state); 
      changedInstances.push(changedState);

    }
    if (country) {
      const changedCountry = profileService.changeCountry(country); 
      changedInstances.push(changedCountry);
    }

    const updatedProfile = profileService.update(changedInstances);
     
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "",
      user: updatedProfile
    });
  }
  catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: error.message,
    });
  }
};


module.exports = {
  editProfile,
};