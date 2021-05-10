require('dotenv').config();
const jwt = require("jsonwebtoken");
const UserService = require('./users');

class AuthService {

  async register (user) {
    return UserService.createUser(user);
  }

  verifyToken(token) {
    return jwt.verify(token, `${process.env.JWT_SECRET}`);
  }
}

const service = new AuthService();

module.exports = service;