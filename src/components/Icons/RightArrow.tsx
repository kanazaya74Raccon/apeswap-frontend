import * as React from "react"

const SvgComponent = (props) => (
  <svg
    width={23}
    height={27}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M21.67 16.045c-.128.13-.608.688-1.055 1.147-2.622 2.887-9.46 7.612-13.04 9.054-.543.232-1.918.723-2.652.754a4.35 4.35 0 0 1-2.014-.49 4.216 4.216 0 0 1-1.789-2.035c-.226-.591-.576-2.362-.576-2.394C.193 20.144 0 16.997 0 13.518c0-3.314.193-6.334.48-8.3.033-.032.384-2.232.767-2.986C1.951.855 3.325 0 4.796 0h.127c.958.034 2.972.889 2.972.92 3.387 1.445 10.068 5.938 12.753 8.924 0 0 .756.767 1.085 1.246.513.689.767 1.542.767 2.394 0 .952-.287 1.838-.83 2.56Z"
      fill="currentColor"
    />
  </svg>
)

export default SvgComponent