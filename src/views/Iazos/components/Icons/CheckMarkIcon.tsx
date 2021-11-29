import React from 'react'
import IconProps from './types'

const CheckMarkIcon: React.FC<IconProps> = (props) => {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 0a5 5 0 00-5 5v14a5 5 0 005 5h14a5 5 0 005-5V5a5 5 0 00-5-5H5zm13.728 8.685a1 1 0 10-1.456-1.37l-7.237 7.689-2.276-2.655a1 1 0 00-1.518 1.302l3 3.5a1 1 0 001.487.034l8-8.5z"
      />
    </svg>
  )
}

export default CheckMarkIcon
