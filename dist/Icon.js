'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactFontawesome = require('react-fontawesome');

var _reactFontawesome2 = _interopRequireDefault(_reactFontawesome);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Icon = function Icon(_ref) {
  var type = _ref.type;

  switch (type) {
    case 'prompt':
      return _react2.default.createElement(_reactFontawesome2.default, {
        name: 'terminal',
        fixedWidth: true,
        style: { top: 6, color: '#1565CC' } });
    case 'self':
      return _react2.default.createElement(_reactFontawesome2.default, {
        name: 'angle-right',
        fixedWidth: true,
        style: { color: 'grey' } });
    case 'eval':
      return _react2.default.createElement(_reactFontawesome2.default, {
        name: 'angle-double-left',
        fixedWidth: true,
        style: { color: 'grey' } });
    case 'error':
      return _react2.default.createElement(_reactFontawesome2.default, {
        name: 'times-circle',
        fixedWidth: true,
        style: { color: 'red' } });
    case 'info':
      return _react2.default.createElement(_reactFontawesome2.default, {
        name: 'info-circle',
        fixedWidth: true,
        style: { color: 'blue' } });
    case 'warn':
      return _react2.default.createElement(_reactFontawesome2.default, {
        name: 'exclamation-triangle',
        fixedWidth: true,
        style: { color: '#EAC500' } });
    default:
      return _react2.default.createElement('span', null);
  }
};

exports.default = Icon;