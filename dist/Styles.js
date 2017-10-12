'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactHelmet = require('react-helmet');

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Styles = function Styles(_ref) {
  var noFontawesome = _ref.noFontawesome;

  var links = [{
    rel: 'stylesheet',
    href: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.3.0/styles/default.min.css'
  }];
  if (!noFontawesome) {
    links.push({
      rel: 'stylesheet',
      href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css'
    });
  }

  return _react2.default.createElement(_reactHelmet2.default, {
    link: links,
    style: [{
      cssText: '\n          .react-console .CodeMirror {\n            height: auto;\n          }\n\n          .react-console .CodeMirror-lines {\n            padding: 2px 0;\n          }\n\n          .react-console pre {\n            margin: 0;\n          }\n\n          .react-console code.hljs {\n            background: none;\n            padding: 0;\n          }\n\n          .react-console .line {\n            border-bottom: 1px solid rgba(34,36,38,.06);\n            min-height: 14px;\n            padding: 1.5px 0 1.5px 20px;\n            position: relative;\n          }\n\n          .react-console .line .fa {\n            position: absolute;\n            font-size: 0.8em;\n            font-weight: bold;\n            top: 3.5px;\n            left: 2px;\n          }\n\n          .react-console input {\n            font-family: monospace;\n            border: none;\n            width: 100%;\n          }\n\n          .react-console input:focus {\n            outline: none;\n          }\n        '
    }] });
};

exports.default = Styles;