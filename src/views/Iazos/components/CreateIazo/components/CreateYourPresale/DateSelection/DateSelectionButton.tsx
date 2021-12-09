import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import CalendarIcon from 'views/Iazos/components/Icons/CalendarIcon'
import useTheme from 'hooks/useTheme'

interface DateSelectionProps {
  onChange: (date: Date) => void
  minDate?: Date
}

const DateSelectionButton: React.FC<DateSelectionProps> = ({ onChange, minDate }) => {
  const [datePickerOpen, setDatePickerOpen] = useState(false)
  const delayedDate = new Date(new Date().setDate(new Date().getDate() + 10))
  const [date, setDate] = useState<Date>(delayedDate)
  const datePickerRef = useRef(null)
  const iconRef = useRef(null)
  const { isDark } = useTheme()
  const iconColor = isDark ? 'white' : '#A16552'

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
        <IconImageWrapper onClick={() => setDatePickerOpen(!datePickerOpen)} ref={iconRef}>
          <CalendarIcon fill={iconColor} />
        </IconImageWrapper>
        {datePickerOpen && (
          <DatePickerContainer ref={datePickerRef}>
            <DatePicker
              showTimeInput
              selected={date}
              minDate={minDate || delayedDate}
              onChange={(d) => {
                setDate(d as Date)
                onChange(d as Date)
              }}
              inline
            />
          </DatePickerContainer>
        )}
      </IconWrapper>
    </>
  )
}

const IconWrapper = styled.div`
  position: absolute;
  left: 10px;
  top: 20px;
  ${({ theme }) => theme.mediaQueries.md} {
    position: relative;
  }
`

const IconImageWrapper = styled.div`
  align: left;
  height: 30px;
  width: 30px;
  cursor: pointer;
`

const DatePickerContainer = styled.div`
  position: absolute;
  right: 10px;
  top: -280px;
  z-index: 100;
  ${({ theme }) => theme.mediaQueries.md} {
    right: 40px;
    top: -260px;
  }
`

export default DateSelectionButton
