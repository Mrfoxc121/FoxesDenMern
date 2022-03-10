"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteUser = exports.getUsers = exports.updateUserProfile = exports.getUserProfile = exports.registerUser = exports.authUser = void 0;

var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));

var _generateToken = _interopRequireDefault(require("../utils/generateToken.js"));

var _userModel = _interopRequireDefault(require("../models/userModel.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//  @desc Auth user & get token
// @route POST /api/users/login
// @access Public
var authUser = (0, _expressAsyncHandler["default"])(function _callee(req, res) {
  var _req$body, email, password, user;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, email = _req$body.email, password = _req$body.password;
          _context.next = 3;
          return regeneratorRuntime.awrap(_userModel["default"].findOne({
            email: email
          }));

        case 3:
          user = _context.sent;
          _context.t0 = user;

          if (!_context.t0) {
            _context.next = 9;
            break;
          }

          _context.next = 8;
          return regeneratorRuntime.awrap(user.matchPasword(password));

        case 8:
          _context.t0 = _context.sent;

        case 9:
          if (!_context.t0) {
            _context.next = 13;
            break;
          }

          res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: (0, _generateToken["default"])(user._id)
          });
          _context.next = 15;
          break;

        case 13:
          res.setMaxListeners(401);
          throw new Error('Invalid email or password');

        case 15:
        case "end":
          return _context.stop();
      }
    }
  });
}); //  @desc Register a new user
// @route POST /api/users/login
// @access Public

exports.authUser = authUser;
var registerUser = (0, _expressAsyncHandler["default"])(function _callee2(req, res) {
  var _req$body2, name, email, password, userExists, user;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, name = _req$body2.name, email = _req$body2.email, password = _req$body2.password;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_userModel["default"].findOne({
            email: email
          }));

        case 3:
          userExists = _context2.sent;

          if (!userExists) {
            _context2.next = 7;
            break;
          }

          res.status(400);
          throw new Error('User already exists');

        case 7:
          _context2.next = 9;
          return regeneratorRuntime.awrap(_userModel["default"].create({
            name: name,
            email: email,
            password: password
          }));

        case 9:
          user = _context2.sent;

          if (!user) {
            _context2.next = 14;
            break;
          }

          res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: (0, _generateToken["default"])(user._id)
          });
          _context2.next = 16;
          break;

        case 14:
          res.status(404);
          throw new Error('User not found');

        case 16:
        case "end":
          return _context2.stop();
      }
    }
  });
}); //  @desc GET user profile
// @route POST /api/users/profile
// @access Private
//  @desc GET user profile
// @route POST /api/users/profile
// @access Private

exports.registerUser = registerUser;
var getUserProfile = (0, _expressAsyncHandler["default"])(function _callee3(req, res) {
  var user;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(_userModel["default"].findById(req.user._id));

        case 2:
          user = _context3.sent;

          if (!user) {
            _context3.next = 7;
            break;
          }

          res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
          });
          _context3.next = 9;
          break;

        case 7:
          res.status(404);
          throw new Error('User not found');

        case 9:
        case "end":
          return _context3.stop();
      }
    }
  });
}); //  @desc Update user profile
// @route PUT /api/users/profile
// @access Private

exports.getUserProfile = getUserProfile;
var updateUserProfile = (0, _expressAsyncHandler["default"])(function _callee4(req, res) {
  var user, updatedUser;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(_userModel["default"].findById(req.user._id));

        case 2:
          user = _context4.sent;

          if (!user) {
            _context4.next = 13;
            break;
          }

          user.name = req.body.name || user.name;
          user.email = req.body.email || user.email;

          if (req.body.password) {
            user.password = req.body.password;
          }

          _context4.next = 9;
          return regeneratorRuntime.awrap(user.save());

        case 9:
          updatedUser = _context4.sent;
          res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: (0, _generateToken["default"])(updatedUser._id)
          });
          _context4.next = 15;
          break;

        case 13:
          res.status(404);
          throw new Error('User not found');

        case 15:
        case "end":
          return _context4.stop();
      }
    }
  });
}); //  @desc GET all users
// @route POST /api/users
// @access Private/admin

exports.updateUserProfile = updateUserProfile;
var getUsers = (0, _expressAsyncHandler["default"])(function _callee5(req, res) {
  var users;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(_userModel["default"].find({}));

        case 2:
          users = _context5.sent;
          res.json(users);

        case 4:
        case "end":
          return _context5.stop();
      }
    }
  });
}); //  @desc Delete user
// @route DELETE /api/users/:id
// @access Private/admin

exports.getUsers = getUsers;
var deleteUser = (0, _expressAsyncHandler["default"])(function _callee6(req, res) {
  var user;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(_userModel["default"].findById(req.params.id));

        case 2:
          user = _context6.sent;

          if (!user) {
            _context6.next = 9;
            break;
          }

          _context6.next = 6;
          return regeneratorRuntime.awrap(user.remove());

        case 6:
          res.json({
            message: 'User removed'
          });
          _context6.next = 11;
          break;

        case 9:
          res.status(404);
          throw new Error('User not found');

        case 11:
        case "end":
          return _context6.stop();
      }
    }
  });
}); //  @desc GET user by IG
// @route GET /api/users/:id
// @access Private/admin

exports.deleteUser = deleteUser;
var getUsersById = (0, _expressAsyncHandler["default"])(function _callee7(req, res) {
  var user;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(_userModel["default"].findById(req.params.id).select('-password'));

        case 2:
          user = _context7.sent;

          if (!user) {
            _context7.next = 7;
            break;
          }

          res.json(user);
          _context7.next = 8;
          break;

        case 7:
          throw new Error('User not found');

        case 8:
        case "end":
          return _context7.stop();
      }
    }
  });
});