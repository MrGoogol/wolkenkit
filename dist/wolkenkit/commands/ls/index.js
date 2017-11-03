'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var noop = require('../../../noop'),
    runtimes = require('../../runtimes'),
    shared = require('../shared');

var ls = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(options) {
    var _this = this;

    var progress = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
    var directory, env, configuration, supportedVersions, installedVersions;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (options) {
              _context2.next = 2;
              break;
            }

            throw new Error('Options are missing.');

          case 2:
            if (options.directory) {
              _context2.next = 4;
              break;
            }

            throw new Error('Directory is missing.');

          case 4:
            if (options.env) {
              _context2.next = 6;
              break;
            }

            throw new Error('Environment is missing.');

          case 6:
            directory = options.directory, env = options.env;
            _context2.next = 9;
            return shared.getConfiguration({
              env: env,
              directory: directory,
              isPackageJsonRequired: false
            }, progress);

          case 9:
            configuration = _context2.sent;
            _context2.next = 12;
            return shared.checkDocker({ configuration: configuration, env: env }, progress);

          case 12:
            _context2.next = 14;
            return runtimes.getAllVersions();

          case 14:
            supportedVersions = _context2.sent;
            installedVersions = [];
            _context2.next = 18;
            return Promise.all(supportedVersions.map(function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(version) {
                var isInstalled;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return runtimes.isInstalled({ configuration: configuration, env: env, forVersion: version });

                      case 2:
                        isInstalled = _context.sent;


                        if (isInstalled) {
                          installedVersions.push(version);
                        }

                      case 4:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, _this);
              }));

              return function (_x3) {
                return _ref2.apply(this, arguments);
              };
            }()));

          case 18:

            supportedVersions.forEach(function (version) {
              if (installedVersions.includes(version)) {
                return progress({ message: version + ' (installed)', type: 'list' });
              }

              progress({ message: version, type: 'list' });
            });

            return _context2.abrupt('return', { supported: supportedVersions, installed: installedVersions });

          case 20:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function ls(_x) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = ls;