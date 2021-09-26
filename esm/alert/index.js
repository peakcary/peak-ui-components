import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

var Alert = function Alert(_ref) {
  var text = _ref.text;
  return React.createElement("div", {
    className: "aaa"
  }, "\u8FD9\u662F\u4E00\u4E2AAlert ", text);
};

Alert.propTypes = {
  text: PropTypes.any
};
export default Alert;