import React, { Fragment } from 'react'
import './DatepickerTest.css'
import useCalendar from './useCalendar'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'

export interface ICalendar
Props {}

const Calendar
: React.FunctionComponent<ICalendar
Props> = (
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
    <Fragment>
      <div className='HeaderCalander'>
        <AiOutlineLeft onClick={getPrevMonth} className='ButtonPrev' />
        <p>
          {`${
            monthNames[selectedDate.getMonth()]
          },  ${selectedDate.getFullYear()}`}
        </p>
        <AiOutlineRight onClick={getNextMonth} className='ButtonNext' />
      </div>
      <div className='ButtonContainer'>
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
                <div className='hoverDay'>{day}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.values(calendarRows).map((cols: any) => {
            return (
              <tr className='rowDay' key={cols[0].date}>
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
    </Fragment>
  )
}

export default Calendar

