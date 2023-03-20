
const Services = require('./base.service');
const { User } = require('../models');

class ProfileService extends Services {
  constructor() {
    super(User);
  }

  async updateProfile({ userId, name, phoneNumber, gender, country, state }) {
    const user = await this.get(userId);
    user.name = name;
    user.phoneNumber = phoneNumber;
    user.gender = gender;
    user.country = country;
    user.state = state;
    return user.save();
  }

  async addPhoto({ userId, photoUrl }) {
    const user = await this.get(userId);
    user.photoUrl = photoUrl;
    return user.save();
  }

  async deletePhoto(userId) {
    const user = await this.get(userId);
    user.photoUrl = null;
    return user.save();
  }

  async changeFirstname() {
  }

  async changeLastname() {

  }
  async changeAge() { 

  }
  async changeSex() { 

  }
  async changeState() {

   }
  async changeCountry() {

   }
}

module.exports = new ProfileService();