"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProductById = exports.getProducts = void 0;

var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));

var _productModel = _interopRequireDefault(require("../models/productModel.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//  @desc Fetch all products
// @route GET /api/products
// @access public route
var getProducts = (0, _expressAsyncHandler["default"])(function _callee(req, res) {
  var products;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_productModel["default"].find({}));

        case 2:
          products = _context.sent;
          res.json(products);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}); //  @desc Fetch single product
// @route GET /api/products/:id
// @access public route

exports.getProducts = getProducts;
var getProductById = (0, _expressAsyncHandler["default"])(function _callee2(req, res) {
  var product;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(_productModel["default"].findById(req.params.id));

        case 2:
          product = _context2.sent;

          if (!product) {
            _context2.next = 7;
            break;
          }

          res.json(product);
          _context2.next = 9;
          break;

        case 7:
          res.status(404);
          throw new Error('Product not found');

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  });
});
exports.getProductById = getProductById;