"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Cross = function Cross(_ref) {
  var message = _ref.message,
      className = _ref.className,
      style = _ref.style;

  return _react2.default.createElement(
    "div",
    { title: message },
    _react2.default.createElement(
      "svg",
      {
        height: "38",
        width: "38",
        viewBox: "0 0 38 38",
        className: className,
        style: style,
        xmlns: "http://www.w3.org/2000/svg"
      },
      _react2.default.createElement("path", {
        stroke: "#F00",
        strokeWidth: "8",
        strokeLinecap: "round",
        d: "m14,14 92,92m0-92-92,92"
      })
    )
  );
};

var string = _react.PropTypes.string;

Cross.propTypes = {
  message: string,
  className: string,
  style: string
};

Cross.defaultProps = {
  message: 'An error occured'
};

exports.default = Cross;