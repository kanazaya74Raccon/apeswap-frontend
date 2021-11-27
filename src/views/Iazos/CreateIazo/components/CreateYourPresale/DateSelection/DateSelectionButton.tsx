import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

interface DateSelectionProps {
  onChange: (date: Date) => void
  minDate?: Date
}

const IconWrapper = styled.div`
  position: absolute;
  left: 10px;
  top: 20px;
  ${({ theme }) => theme.mediaQueries.md} {
    position: relative;
  }
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
  right: -100px;
  width: 330px;
  top: -240px;
  z-index: 100;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 400px;
  }
`

const DateSelectionButton: React.FC<DateSelectionProps> = ({ onChange, minDate }) => {
  const [datePickerOpen, setDatePickerOpen] = useState(false)
  const delayedDate = new Date(new Date().setDate(new Date().getDate() + 0))
  const [date, setDate] = useState<Date>(delayedDate)
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

  if (date.getTime() < minDate?.getTime()) {
    setDate(minDate)
    onChange(minDate)
  }

  return (
    <>
      <IconWrapper>
        <IconImage image="calander" onClick={() => setDatePickerOpen(!datePickerOpen)} ref={iconRef} />
        {datePickerOpen && (
          <DatePickerContainer ref={datePickerRef}>
            <DatePicker
              showTimeInput
              selected={date}
              minDate={minDate || delayedDate}
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
