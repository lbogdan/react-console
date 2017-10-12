'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactObjectInspector = require('@tilastokeskus/react-object-inspector');

var _reactObjectInspector2 = _interopRequireDefault(_reactObjectInspector);

var _reactHighlight = require('react-highlight');

var _reactHighlight2 = _interopRequireDefault(_reactHighlight);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Icon = require('./Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Message = function (_Component) {
  _inherits(Message, _Component);

  function Message() {
    _classCallCheck(this, Message);

    return _possibleConstructorReturn(this, (Message.__proto__ || Object.getPrototypeOf(Message)).apply(this, arguments));
  }

  _createClass(Message, [{
    key: '_getContent',
    value: function _getContent() {
      var _props$data = this.props.data,
          type = _props$data.type,
          message = _props$data.message;


      if (type === 'self') {
        return _react2.default.createElement(
          'span',
          null,
          _react2.default.createElement(_Icon2.default, { type: 'self' }),
          _react2.default.createElement(
            _reactHighlight2.default,
            { className: 'javascript' },
            message
          )
        );
      }

      if (type === 'error') {
        return _react2.default.createElement(
          'span',
          null,
          _react2.default.createElement(_Icon2.default, { type: 'error' }),
          _react2.default.createElement(_reactObjectInspector2.default, { data: message.stack || message })
        );
      }

      if (type === 'eval') {
        return _react2.default.createElement(
          'span',
          null,
          _react2.default.createElement(_Icon2.default, { type: 'eval' }),
          _react2.default.createElement(_reactObjectInspector2.default, { data: message })
        );
      }

      var content = message.map(function (s, index) {
        return _react2.default.createElement(
          'span',
          { key: index },
          parseConent(s)
        );
      });

      if (type === 'info') {
        return _react2.default.createElement(
          'span',
          null,
          _react2.default.createElement(_Icon2.default, { type: 'info' }),
          content
        );
      }

      if (type === 'warn') {
        return _react2.default.createElement(
          'span',
          null,
          _react2.default.createElement(_Icon2.default, { type: 'warn' }),
          content
        );
      }

      if (type === 'debug') {
        return _react2.default.createElement(
          'span',
          { style: { color: 'blue' } },
          content
        );
      }

      return _react2.default.createElement(
        'span',
        null,
        content
      );
    }
  }, {
    key: '_getStyle',
    value: function _getStyle() {
      var type = this.props.data.type;

      switch (type) {
        case 'warn':
          return {
            backgroundColor: '#FFFAE2',
            color: '#A9782C'
          };
        case 'error':
          return {
            backgroundColor: '#FFDFDF',
            color: 'red'
          };
        case 'eval':
          return { paddingTop: 2 };
        default:
          return {};
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'line', style: this._getStyle() },
        this._getContent()
      );
    }
  }]);

  return Message;
}(_react.Component);

Message.propTypes = {
  data: _propTypes2.default.object.isRequired
};

exports.default = Message;


function parseConent(content) {
  if (typeof content === 'string') {
    return content;
  }

  return _react2.default.createElement(_reactObjectInspector2.default, { data: content });
}