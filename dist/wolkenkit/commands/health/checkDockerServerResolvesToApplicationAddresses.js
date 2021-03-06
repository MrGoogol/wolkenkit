'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var arrayToSentence = require('array-to-sentence'),
    intersectionWith = require('lodash/intersectionWith'),
    isEqual = require('lodash/isEqual');

var docker = require('../../../docker'),
    errors = require('../../../errors');

var checkDockerServerResolvesToApplicationAddresses = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(options, progress) {
    var configuration, env, applicationAddresses, dockerAddresses;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (options) {
              _context.next = 2;
              break;
            }

            throw new Error('Options are missing.');

          case 2:
            if (options.configuration) {
              _context.next = 4;
              break;
            }

            throw new Error('Configuration is missing.');

          case 4:
            if (options.env) {
              _context.next = 6;
              break;
            }

            throw new Error('Environment is missing.');

          case 6:
            if (options.applicationAddresses) {
              _context.next = 8;
              break;
            }

            throw new Error('Application addresses are missing.');

          case 8:
            if (progress) {
              _context.next = 10;
              break;
            }

            throw new Error('Progress is missing.');

          case 10:
            configuration = options.configuration, env = options.env, applicationAddresses = options.applicationAddresses;
            dockerAddresses = void 0;
            _context.prev = 12;
            _context.next = 15;
            return docker.getHostIpAddresses({ configuration: configuration, env: env });

          case 15:
            dockerAddresses = _context.sent;
            _context.next = 23;
            break;

          case 18:
            _context.prev = 18;
            _context.t0 = _context['catch'](12);

            progress({ message: _context.t0.message });
            progress({ message: 'Failed to resolve Docker server.', type: 'info' });

            throw _context.t0;

          case 23:

            progress({ message: 'Docker server resolves to ' + arrayToSentence(dockerAddresses.map(function (ip) {
                return ip.address;
              })) + '.' });

            if (!(intersectionWith(applicationAddresses, dockerAddresses, isEqual).length === 0)) {
              _context.next = 27;
              break;
            }

            progress({ message: 'Application and Docker server do not resolve to the same IP address.', type: 'info' });

            throw new errors.AddressMismatch();

          case 27:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[12, 18]]);
  }));

  return function checkDockerServerResolvesToApplicationAddresses(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = checkDockerServerResolvesToApplicationAddresses;