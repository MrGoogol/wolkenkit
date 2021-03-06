'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var docker = require('../../docker'),
    getImages = require('./getImages');

var getImagesInUse = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(options) {
    var configuration, env, forVersion, imagesInUse, images, i, image, name, version, isInstalled, isInUse;
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
            if (options.forVersion) {
              _context.next = 8;
              break;
            }

            throw new Error('Version is missing.');

          case 8:
            configuration = options.configuration, env = options.env, forVersion = options.forVersion;
            imagesInUse = [];
            _context.next = 12;
            return getImages({ forVersion: forVersion });

          case 12:
            images = _context.sent;
            i = 0;

          case 14:
            if (!(i < images.length)) {
              _context.next = 29;
              break;
            }

            image = images[i];
            name = image.name, version = image.version;
            _context.next = 19;
            return docker.isImageInstalled({ configuration: configuration, env: env, name: name, version: version });

          case 19:
            isInstalled = _context.sent;

            if (isInstalled) {
              _context.next = 22;
              break;
            }

            return _context.abrupt('continue', 26);

          case 22:
            _context.next = 24;
            return docker.isImageInUse({ configuration: configuration, env: env, name: name, version: version });

          case 24:
            isInUse = _context.sent;


            if (isInUse) {
              imagesInUse.push(image);
            }

          case 26:
            i++;
            _context.next = 14;
            break;

          case 29:
            return _context.abrupt('return', imagesInUse);

          case 30:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getImagesInUse(_x) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = getImagesInUse;