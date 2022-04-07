//ledoan
import React, { useState, useEffect, useRef } from 'react'

import useCalendar from './UseCalendar'
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
  const [showValueDate, setShowValueDate] = useState<string | undefined>(
    undefined
  )
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
        <table>
          <thead>
            <tr>
              {daysShort.map((day) => (
                <th key={day}> {day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.values(calendarRows).map((cols: any) => {
              return (
                <tr key={cols[0].date}>
                  {cols.map((col: any) =>
                    col.date === todayFormatted ? (
                      <td
                        key={col.date}
                        className={`${col.classes} today`}
                        onClick={() => dateClickHandler(col.date)}
                      >
                        {col.value}
                      </td>
                    ) : (
                      <td
                        key={col.date}
                        className={col.classes}
                        onClick={() => dateClickHandler(col.date)}
                      >
                        {col.value}
                      </td>
                    )
                  )}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Calendar