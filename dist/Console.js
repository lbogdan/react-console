'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _debounce = require('debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _Styles = require('./Styles');

var _Styles2 = _interopRequireDefault(_Styles);

var _MessageList = require('./MessageList');

var _MessageList2 = _interopRequireDefault(_MessageList);

var _Input = require('./Input');

var _Input2 = _interopRequireDefault(_Input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var containerStyle = {
  fontFamily: 'monospace',
  fontSize: 'small',
  overflow: 'auto',
  padding: 2,
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
};

var Console = function (_Component) {
  _inherits(Console, _Component);

  function Console(props) {
    _classCallCheck(this, Console);

    var _this = _possibleConstructorReturn(this, (Console.__proto__ || Object.getPrototypeOf(Console)).call(this, props));

    _this.state = {
      data: []
    };
    _this.addMessage = _this.addMessage.bind(_this);
    _this.clearMessages = _this.clearMessages.bind(_this);

    _this._buffer = [];
    _this._updateData = (0, _debounce2.default)(_this._updateData, 100);
    return _this;
  }

  _createClass(Console, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.state.data.length === prevState.data.length) {
        return;
      }

      // scroll to bottom
      (0, _reactDom.findDOMNode)(this.refs.input).scrollIntoView();
    }
  }, {
    key: 'addMessage',
    value: function addMessage(type, message) {
      this._buffer.push({ type: type, message: message });
      this._updateData();
    }
  }, {
    key: 'clearMessages',
    value: function clearMessages() {
      this.setState({ data: [] });
    }
  }, {
    key: '_updateData',
    value: function _updateData() {
      if (this._buffer.length > 0) {
        var data = [].concat(_toConsumableArray(this.state.data), _toConsumableArray(this._buffer));
        this.setState({ data: data });
        this._buffer = [];
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        {
          className: 'react-console',
          style: Object.assign({}, containerStyle, this.props.style) },
        _react2.default.createElement(_Styles2.default, { noFontawesome: this.props.noFontawesome }),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_MessageList2.default, { data: this.state.data }),
          _react2.default.createElement(_Input2.default, {
            ref: 'input',
            addMessage: this.addMessage,
            clearMessages: this.clearMessages })
        )
      );
    }
  }]);

  return Console;
}(_react.Component);

exports.default = Console;