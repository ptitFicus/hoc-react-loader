import React, { PropTypes } from 'react'

const Cross = ({ message, className, style }) => {
  return (
    <div title={message}>
      <svg
        height="38"
        width="38"
        viewBox="0 0 38 38"
        className={className}
        style={style}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke="#ff0000"
          strokeWidth="3.03754568"
          strokeLinecap="round"
          id="path3728"
          d="M 1.5341128,1.5341128 36.465887,36.465887 m 0,-34.9317742 L 1.5341128,36.465887"
        />
      </svg>
    </div>
  )
}

const { string } = PropTypes
Cross.propTypes = {
  message: string,
  className: string,
  style: string,
}

Cross.defaultProps = {
  message: 'An error occured',
}

export default Cross
