require('dotenv').config();
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
const UserModel = require('../models/user');

const saltRounds = 10;

/**
 *
 *
 * @class UserService
 */
class UserService {

  /**
   *
   *
   * @param {*} user
   * @return {*} 
   * @memberof UserService
   */
  async createUser(user) {
    const { password, name, email, phoneNumber, address } = user;
    const hash = await bcrypt.hash(password, saltRounds);

    const obj = {
      name,
      email,
      address,
      phoneNumber,
      passwordHash: hash
    }

    const newUser = await UserModel.create(obj);
    return newUser;
  }

  /**
   *
   *
   * @param {*} user
   * @return {*} 
   * @memberof UserService
   */
  async logInUser(user) {
    const {email, password} = user;

    const _user = await this.getUserByEmail(email)

    const match = await bcrypt.compare(password, _user.passwordHash)

    if (!match) {
      throw 'Wrong password'
    }

    let jwtToken = jwt.sign({
      email: email,
      userId: _user._id
    }, `${process.env.JWT_SECRET}`, {
      expiresIn: "2y"
    });
    
    delete _user._doc.passwordHash;

    let obj = {
      token: jwtToken,
      user: _user,
    }

    return obj;
  }

  /**
   *
   *
   * @param {*} email
   * @return {*} 
   * @memberof UserService
   */
  async getUserByEmail(email) {
    let user = await UserModel.findOne({email}).exec()

    return user
  };

  /**
   *
   *
   * @param {*} [searchQuery={}]
   * @return {*} 
   * @memberof UserService
   */
  findUser(searchQuery = {}) {
    return UserModel.find(searchQuery);
  }

  /**
   *
   *
   * @param {*} id
   * @return {*} 
   * @memberof UserService
   */
  getByUserId(id) {
    return UserModel.findById(id);
  }

  /**
   *
   *
   * @param {*} id
   * @param {*} user
   * @return {*} 
   * @memberof UserService
   */
  async updateById(id, user) {
    await UserModel.updateOne({ _id: id }, user, { new: true });
    return this.getByUserId(id);
  };

  /**
   *
   *
   * @param {*} id
   * @return {*} 
   * @memberof UserService
   */
  deleteByUserId(id) {
    return UserModel.deleteOne({ _id: id });
  }
}

const service = new UserService();

module.exports = service;