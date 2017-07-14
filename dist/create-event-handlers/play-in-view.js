'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash.throttle');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(player, _ref) {
    var _this = this;

    var percentage = _ref.percentage;

    _classCallCheck(this, _class);

    this.percentage = percentage || 10;
    this.player = player;
    this.wrapper = this.player.getContainer();
    this.throttledScrollListener = (0, _lodash2.default)(function () {
      _this.playerInView();
    }, 300);
  }

  _createClass(_class, [{
    key: 'playerPosition',
    value: function playerPosition(playerEl) {
      if (playerEl && playerEl.getBoundingClientRect) {
        var bodyRect = document.body.getBoundingClientRect();
        var playerRect = playerEl.getBoundingClientRect();
        return playerRect.top - bodyRect.top - this.scrollPosition().top;
      }
      return null;
    }
  }, {
    key: 'scrollPosition',
    value: function scrollPosition() {
      var doc = document.documentElement;
      return {
        left: (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0),
        top: (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)
      };
    }
  }, {
    key: 'playerInView',
    value: function playerInView() {
      var percentagePlayerHeight = this.player.getHeight() / this.percentage;
      var difference = this.playerPosition(this.wrapper) + percentagePlayerHeight;
      var adjust = window.innerHeight > percentagePlayerHeight * 5 ? window.innerHeight : 100;
      var inView = difference > percentagePlayerHeight * -6 && difference < adjust;
      return this.player.play(inView);
    }
  }, {
    key: 'on',
    value: function on() {
      window.addEventListener('scroll', this.throttledScrollListener);
    }
  }, {
    key: 'off',
    value: function off() {
      window.removeEventListener('scroll', this.throttledScrollListener);
    }
  }]);

  return _class;
}();

exports.default = _class;