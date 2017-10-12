'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Message = require('./Message');

var _Message2 = _interopRequireDefault(_Message);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MessageList = function (_Component) {
  _inherits(MessageList, _Component);

  function MessageList() {
    _classCallCheck(this, MessageList);

    return _possibleConstructorReturn(this, (MessageList.__proto__ || Object.getPrototypeOf(MessageList)).apply(this, arguments));
  }

  _createClass(MessageList, [{
    key: 'render',
    value: function render() {
      var data = this.props.data;


      return _react2.default.createElement(
        'div',
        null,
        data.map(function (message, index) {
          return _react2.default.createElement(_Message2.default, {
            key: index,
            data: message });
        })
      );
    }
  }]);

  return MessageList;
}(_react.Component);

MessageList.propTypes = {
  data: _propTypes2.default.array.isRequired
};

exports.default = MessageList;