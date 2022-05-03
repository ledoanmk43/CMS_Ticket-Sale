import React, { useState, useEffect, useRef } from 'react'

import useCalendar from './useCalendar'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import { Radio } from 'antd'

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
  const options = [
    { label: 'Theo ngày', value: '' },
    { label: 'Theo tuần', value: '' },
  ]

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
  const onChangeStatus = (e: any) => {
    setCheckedStatus(e.target.value)
  }
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
        <Radio.Group
          className='radio-control'
          options={options}
          // onChange={onChangeStatus}
          value={checkedStatus}
        />
      </div>
      <div className='table-carlendar'>
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
