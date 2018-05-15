'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Todolist = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var Todolist = exports.Todolist = new Schema({
  title: {
    type: String,
    required: [true, 'Title task required']
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'done', 'cancel'],
    description: 'can only be one of the enum values and is required',
    default: 'pending'
  },
  content: {
    type: String
  }
});

exports.default = _mongoose2.default.model('Todolist', Todolist);