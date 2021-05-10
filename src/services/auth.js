require('dotenv').config();
const jwt = require("jsonwebtoken");
const UserService = require('./users');

/**
 * auth service containes methods for user Authentication
 *
 * @class AuthService
 */
class AuthService {

  /**
   *
   *
   * @param {*} user
   * @return {*} 
   * @memberof AuthService
   */
  async register (user) {
    return UserService.createUser(user);
  }

  /**
   *
   *
   * @param {*} token
   * @return {*} 
   * @memberof AuthService
   */
  verifyToken(token) {
    return jwt.verify(token, `${process.env.JWT_SECRET}`);
  }
}

const service = new AuthService();

module.exports = service;