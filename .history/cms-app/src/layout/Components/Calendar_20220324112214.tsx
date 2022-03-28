import React, { Fragment } from 'react'

import useCalendar from './useCalendar'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'

export interface IDatepickerTestProps {}

const DatepickerTest: React.FunctionComponent<IDatepickerTestProps> = (
  props
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

  return (
    <div className='calendar-container'>
      <div className='header'>
        <AiOutlineLeft onClick={getPrevMonth} className='btn-prev' />
        <p>
          {`${
            monthNames[selectedDate.getMonth()]
          },  ${selectedDate.getFullYear()}`}
        </p>
        <AiOutlineRight onClick={getNextMonth} className='btn-next' />
      </div>
      <div className='btn-container'>
        <div className='DayButtonControl'>
          <input type='radio' />
          <span>Theo Ngày</span>
        </div>
        <div className='WeekButtonControl'>
          <input type='radio' />
          <span>Theo Tuần</span>
        </div>
      </div>
      <table className='table'>
        <thead>
          <tr className='RowWeeks'>
            {daysShort.map((day) => (
              <th key={day}>
                <div className='date-hover'>{day}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.values(calendarRows).map((cols: any) => {
            return (
              <tr className='dates-row' key={cols[0].date}>
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
  )
}

export default DatepickerTest
