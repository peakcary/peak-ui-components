"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Alert = function Alert(_ref) {
  var text = _ref.text;
  return _react.default.createElement("div", {
    className: "aaa"
  }, "\u8FD9\u662F\u4E00\u4E2AAlert ", text);
};

Alert.propTypes = {
  text: _propTypes.default.any
};
var _default = Alert;
exports.default = _default;