'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _bluebird2.default(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return _bluebird2.default.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

_bluebird2.default.promisifyAll(require('mongoose'));

var Todolist = _mongoose2.default.model('Todolist');

exports.default = {
  getTasks: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
      var result;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return Todolist.find({});

            case 3:
              result = _context.sent;

              res.status(200).json(result);
              _context.next = 10;
              break;

            case 7:
              _context.prev = 7;
              _context.t0 = _context['catch'](0);

              res.status(500).json(_context.t0);

            case 10:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[0, 7]]);
    }));

    function getTasks(_x, _x2) {
      return _ref.apply(this, arguments);
    }

    return getTasks;
  }(),
  getTask: function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
      var id, result;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              id = req.query.id;
              _context2.prev = 1;
              _context2.next = 4;
              return Todolist.find({
                _id: id
              });

            case 4:
              result = _context2.sent;

              res.status(200).json(result);
              _context2.next = 11;
              break;

            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2['catch'](1);

              res.status(500).json(_context2.t0);

            case 11:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this, [[1, 8]]);
    }));

    function getTask(_x3, _x4) {
      return _ref2.apply(this, arguments);
    }

    return getTask;
  }(),
  addTask: function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
      var _req$query, title, content, newTodo, result;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _req$query = req.query, title = _req$query.title, content = _req$query.content;
              _context3.prev = 1;
              newTodo = new Todolist();

              newTodo.set({ title: title, content: content });
              _context3.next = 6;
              return newTodo.save();

            case 6:
              result = _context3.sent;

              res.status(200).json(result);
              _context3.next = 13;
              break;

            case 10:
              _context3.prev = 10;
              _context3.t0 = _context3['catch'](1);

              res.status(500).json(_context3.t0);

            case 13:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this, [[1, 10]]);
    }));

    function addTask(_x5, _x6) {
      return _ref3.apply(this, arguments);
    }

    return addTask;
  }(),
  editTask: function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
      var _req$query2, id, title, content, result;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _req$query2 = req.query, id = _req$query2.id, title = _req$query2.title, content = _req$query2.content;
              _context4.next = 3;
              return Todolist.findById(id, function (err, doc) {
                if (err) {
                  return res.status(500).json(err);
                }
                if (title) {
                  doc.title = title;
                }
                if (content) {
                  doc.content = content;
                }
                doc.update = new Date();
                doc.save();
              });

            case 3:
              result = _context4.sent;

              res.status(200).send('Edit successfully');

            case 5:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function editTask(_x7, _x8) {
      return _ref4.apply(this, arguments);
    }

    return editTask;
  }(),
  setTaskStatus: function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
      var _req$query3, id, status, result;

      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _req$query3 = req.query, id = _req$query3.id, status = _req$query3.status;
              _context5.prev = 1;
              _context5.next = 4;
              return Todolist.update({ _id: id }, {
                $set: {
                  status: status
                }
              });

            case 4:
              result = _context5.sent;

              res.status(200).send('Update task status successfully');
              _context5.next = 11;
              break;

            case 8:
              _context5.prev = 8;
              _context5.t0 = _context5['catch'](1);

              res.status(500).json(_context5.t0);

            case 11:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this, [[1, 8]]);
    }));

    function setTaskStatus(_x9, _x10) {
      return _ref5.apply(this, arguments);
    }

    return setTaskStatus;
  }(),
  deleteTask: function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
      var id, result;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              id = req.query.id;
              _context6.prev = 1;
              _context6.next = 4;
              return Todolist.remove({ _id: id });

            case 4:
              result = _context6.sent;

              res.status(200).send('Delete task successfully');
              _context6.next = 11;
              break;

            case 8:
              _context6.prev = 8;
              _context6.t0 = _context6['catch'](1);

              res.status(500).json(_context6.t0);

            case 11:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, this, [[1, 8]]);
    }));

    function deleteTask(_x11, _x12) {
      return _ref6.apply(this, arguments);
    }

    return deleteTask;
  }()
};