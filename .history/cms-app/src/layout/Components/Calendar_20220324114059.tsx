import React from 'react'

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
      <table className='calendar-container-table'>
        <thead>
          <tr className='calendar-container-dates-row'>
            {daysShort.map((day) => (
              <th key={day}>
                <div className='calendar-container-date-hover'>{day}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.values(calendarRows).map((cols: any) => {
            return (
              <tr className='calendar-container-dates-row' key={cols[0].date}>
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
