'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.setupRoutes = setupRoutes;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _TodolistSchema = require('./Schemas/TodolistSchema');

var _TodolistSchema2 = _interopRequireDefault(_TodolistSchema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function setupRoutes(app) {
  var APP_DIR = __dirname + '/App';
  var features = _fs2.default.readdirSync(APP_DIR).filter(function (file) {
    return _fs2.default.statSync(APP_DIR + '/' + file).isDirectory();
  });

  features.forEach(function (feature) {
    var router = _express2.default.Router();
    var routes = require(APP_DIR + '/' + feature + '/routes.js');

    routes.setup(router);
    app.use('/' + feature, router);
  });
}

var Server = function () {
  function Server() {
    _classCallCheck(this, Server);
  }

  _createClass(Server, [{
    key: 'setup',
    value: function setup() {
      var app = (0, _express2.default)();
      var PORT = process.env.PORT || 3001;

      _mongoose2.default.Promise = global.Promise;
      _mongoose2.default.connect('mongodb://localhost/Todolist');
      _mongoose2.default.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

      app.use(_bodyParser2.default.urlencoded({ extended: true }));
      app.use(_bodyParser2.default.json());

      setupRoutes(app);

      app.listen(PORT, function () {
        return console.log('Start on http://localhost:' + PORT);
      });
    }
  }]);

  return Server;
}();

exports.default = Server;