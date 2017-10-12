'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Icon = require('./Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var style = {
  borderBottom: 'none'
};

var Input = function (_Component) {
  _inherits(Input, _Component);

  function Input(props) {
    _classCallCheck(this, Input);

    var _this = _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).call(this, props));

    _this.state = {
      value: '',
      history: [],
      index: 0
    };
    _this._handleChange = _this._handleChange.bind(_this);
    _this._handleKeyPress = _this._handleKeyPress.bind(_this);
    return _this;
  }

  _createClass(Input, [{
    key: '_addHistory',
    value: function _addHistory(message) {
      this.setState({
        index: this.state.history.length + 1,
        history: [].concat(_toConsumableArray(this.state.history), [message])
      });
    }
  }, {
    key: '_eval',
    value: function _eval() {
      var _props = this.props,
          addMessage = _props.addMessage,
          clearMessages = _props.clearMessages;
      var value = this.state.value;

      var text = value.trim();
      if (!text) return;

      this._addHistory(text);
      this.setState({ value: '' });

      if (text === 'clear') {
        return clearMessages();
      }

      try {
        addMessage('self', text);
        addMessage('eval', eval.call(window, text));
      } catch (err) {
        addMessage('error', err);
      }
    }
  }, {
    key: '_getNextIndex',
    value: function _getNextIndex() {
      var _state = this.state,
          index = _state.index,
          history = _state.history;

      return index < history.length ? index + 1 : index;
    }
  }, {
    key: '_getPrevIndex',
    value: function _getPrevIndex() {
      var index = this.state.index;

      return index === 0 ? 0 : index - 1;
    }
  }, {
    key: '_handleChange',
    value: function _handleChange(e) {
      this.setState({ value: e.target.value });
    }
  }, {
    key: '_handleKeyPress',
    value: function _handleKeyPress(e) {
      if (e.keyCode === 38 || e.keyCode === 40) {
        // up or down is pressed, go to prev or next message
        var index = e.keyCode === 38 ? this._getPrevIndex() : this._getNextIndex();
        this.setState({
          index: index,
          value: this.state.history[index] || ''
        });
      }

      if (e.keyCode === 13) {
        // enter is pressed, evaluate expression
        e.preventDefault();
        this._eval();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        {
          className: 'line',
          style: style },
        _react2.default.createElement(_Icon2.default, { type: 'prompt' }),
        _react2.default.createElement('input', {
          value: this.state.value,
          onChange: this._handleChange,
          onKeyDown: this._handleKeyPress })
      );
    }
  }]);

  return Input;
}(_react.Component);

exports.default = Input;


Input.propTypes = {
  addMessage: _propTypes2.default.func.isRequired,
  clearMessages: _propTypes2.default.func.isRequired
};