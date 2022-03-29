import * as React from 'react'

const Icon: React.FC<{ fill?: string; color?: string }> = (props) => {
  return (
    <svg width={50} height={51} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M15.468 36.93c-.828 0-1.557-.6-1.714-1.442-.886-5.115 1.757-8.83 2.586-9.859.572-.7 3.686-4.2 8.93-4.5 1.714-.1 3.414.171 5.058.771a1.718 1.718 0 0 1 1.014 2.23 1.718 1.718 0 0 1-2.229 1.014 8.89 8.89 0 0 0-3.643-.558c-3.872.215-6.187 2.93-6.43 3.23-.428.514-2.5 3.3-1.857 7.072a1.733 1.733 0 0 1-1.415 2c-.1.029-.2.043-.3.043Z" />
      <path d="M35.314 26.258 29.57 19l-3.415 8.601 9.159-1.343ZM16.326 40.288l9.159-1.343-3.415 8.602-5.744-7.258Z" />
      <path d="M25.598 45.432c-1.286 0-2.686-.2-4.172-.743a1.736 1.736 0 0 1 1.2-3.258c3.587 1.315 6.701-.228 7.287-.542.343-.186 3.429-1.972 4.343-5.744.286-1.2.33-2.443.1-3.686a1.734 1.734 0 0 1 1.415-2.015 1.734 1.734 0 0 1 2.014 1.415c.3 1.729.258 3.443-.157 5.115-1.243 5.1-5.243 7.53-6.043 7.958-.8.428-3.044 1.5-5.987 1.5Z" />
    </svg>
  )
}

export default Icon
