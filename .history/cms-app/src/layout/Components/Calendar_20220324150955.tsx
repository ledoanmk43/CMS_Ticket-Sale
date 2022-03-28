import React, { useState, useEffect, useRef } from 'react'

import useCalendar from './useCalendar'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'

export interface ICalendarProps {
  onClickOutside: () => void
}

const Calendar: React.FunctionComponent<ICalendarProps> = (
  props: ICalendarProps
) => {
  const {
    calendarRows,
    selectedDate,
    todayFormatted,
    daysShort,
    monthNames,
    getNextMonth,
    getPrevMonth,
  } = useCalendar()

  const dateClickHandler = (date: any) => {
    console.log(date)
  }
  const ref = useRef<any>(null)
  const { onClickOutside } = props

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside && onClickOutside()
      }
    }
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [onClickOutside])

  return (
    <div ref={ref} className='calendar-container'>
      <div className='calendar-container-header'>
        <AiOutlineLeft onClick={getPrevMonth} className='btn-prev' />
        <p>
          {`${
            monthNames[selectedDate.getMonth()]
          },  ${selectedDate.getFullYear()}`}
        </p>
        <AiOutlineRight onClick={getNextMonth} className='btn-next' />
      </div>
      <div className='btn-container'>
        <div className='day-control'>
          <input type='radio' />
          <span>Theo Ngày</span>
        </div>
        <div className='week-control'>
          <input type='radio' />
          <span>Theo Tuần</span>
        </div>
      </div>
      <div className='table'>
        <div>
          <div className='heading'>
            {daysShort.map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>
        </div>
        <div className='day-container'>
          {Object.values(calendarRows).map((rows: any) => {
            return (
              <div key={cols[0].date}>
                {rows.map((row: any) =>
                  row.date === todayFormatted ? (
                    <div className='day-width'>
                      <div
                        key={row.date}
                        className={`${row.classes} today`}
                        onClick={() => dateClickHandler(row.date)}
                      >
                        {row.value}
                      </div>
                    </div>
                  ) : (
                    <div className='day-width'>
                      <div
                        key={row.date}
                        className={row.classes}
                        onClick={() => dateClickHandler(row.date)}
                      >
                        {row.value}
                      </div>
                    </div>
                  )
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Calendar
