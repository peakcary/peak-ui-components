import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

const Alert = ({ text }) => <div className="aaa">这是一个Alert {text}</div>

Alert.propTypes = {
  text: PropTypes.any
};

export default Alert;
