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
          stroke="#F00"
          strokeWidth="8"
          strokeLinecap="round"
          d="m14,14 92,92m0-92-92,92"
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
