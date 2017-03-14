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
        stroke: "#ff0000",
        strokeWidth: "3.03754568",
        strokeLinecap: "round",
        id: "path3728",
        d: "M 1.5341128,1.5341128 36.465887,36.465887 m 0,-34.9317742 L 1.5341128,36.465887"
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