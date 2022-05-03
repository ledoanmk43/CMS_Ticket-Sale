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
    { label: 'Theo ngày', value: 'ready' },
    { label: 'Theo tuần', value: 'used' },
  ]
  const getWeek = (date: Date) => {
    const day: any = date.getDay()
    const array = []
    for (var i = 0; i < 7; i++) {
      if (i - day !== 0) {
        var days = i - day
        var newDate = new Date(date.getTime() + days * 24 * 60 * 60 * 1000)

        array.push(newDate)
      } else array.push(date)
    }
  }

  const dateClickHandler = (date: Date) => {
    const a = new Date()

    console.log('tuan nay ne', date)
  }
  const ref = useRef<any>(null)
  const { onClickOutside } = props

  const [checkedStatus, setCheckedStatus] = useState<any>(options[0].value)
  const onChangeStatus = (e: any) => {
    setCheckedStatus(e.target.value)
  }

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
        <Radio.Group
          className='radio-control'
          options={options}
          onChange={onChangeStatus}
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
                        onClick={() => dateClickHandler(col.dateTimestamp.fromDate(date)}
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
