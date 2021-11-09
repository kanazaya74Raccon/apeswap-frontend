import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

interface DateSelectionProps {
  onChange: (date: Date) => void
}

const IconWrapper = styled.div`
  position: relative;
  display: flex;
`

const IconImage = styled.div<{ image: string }>`
  align: left;
  background-image: ${(props) => `url(/images/${props.image}.svg)`};
  height: 30px;
  width: 30px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  cursor: pointer;
`

const DatePickerContainer = styled.div`
  position: absolute;
  left: 50px;
  width: 200px;
  height: 200px;
  top: -150px;
  z-index: 100;
`

const DateSelectionButton: React.FC<DateSelectionProps> = ({ onChange }) => {
  const [datePickerOpen, setDatePickerOpen] = useState(false)
  const [date, setDate] = useState(new Date())
  const datePickerRef = useRef(null)
  const iconRef = useRef(null)

  useEffect(() => {
    function handler(event) {
      if (!datePickerRef.current?.contains(event.target) && !iconRef.current?.contains(event.target)) {
        setDatePickerOpen(false)
      }
    }
    window.addEventListener('click', handler)
    return () => window.removeEventListener('click', handler)
  }, [])

  return (
    <>
      <IconWrapper>
        <IconImage image="calander" onClick={() => setDatePickerOpen(!datePickerOpen)} ref={iconRef} />
        {datePickerOpen && (
          <DatePickerContainer ref={datePickerRef}>
            <DatePicker
              selected={date}
              onChange={(d) => {
                setDate(d)
                onChange(d)
              }}
              zIndex="100"
              inline
            />
          </DatePickerContainer>
        )}
      </IconWrapper>
    </>
  )
}

export default DateSelectionButton
