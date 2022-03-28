import React, { useEffect, useRef, useState } from 'react'

import useCalendar from './useCalendar'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'

export interface IDatepickerTestProps {}

const DatepickerTest: React.FunctionComponent<IDatepickerTestProps> = (
  props
) => {
  const ref = useRef()
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);
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
          <tr className='calendar-container-table-dates-header'>
            {daysShort.map((day) => (
              <th key={day}> {day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.values(calendarRows).map((cols: any) => {
            return (
              <tr className='calendar-container-dates-body' key={cols[0].date}>
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
