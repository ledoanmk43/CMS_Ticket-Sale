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
  const radio = ['Theo tuần', 'Theo tháng']
  const [showDate, setShowDate] = useState(false)

  const dateClickHandler = (date: any) => {
    console.log(date)
  }
  const ref = useRef<any>(null)
  const { onClickOutside } = props
  const handelDayPicker = (date: any, index: number) => {
    if (date) {
      if (dayPicker === 0) {
        if (index + 1) {
          setValueDay(date)
          setValueWeek(undefined)
          setTimeout(() => {
            setShowDate(false)
          }, 1000)
        }
      }
      if (dayPicker === 1) {
        if (index + 1) {
          setValueWeek(index)
          setValueDay(undefined)
          setTimeout(() => {
            setShowDate(false)
          }, 1000)
        }
      }
      setShowValueDate(date)
    }
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
    <div>
      <div ref={ref} className='date-picker'>
        <input
          className='date-picker__input'
          value={showValueDate ? showValueDate : todayFormatted}
          onChange={(e) => console.log(e.target.value)}
        />
        <button className='date-picker__btn' onClick={() => handleDatePicker()}>
          <AiTwotoneCalendar
            style={{
              color: '#FF993C',
              width: '20px',
              height: '20px',
              marginTop: '1px',
            }}
          />
        </button>
      </div>
      {showDate && (
        <div className='calendar'>
          <div className='calendar-header'>
            <AiOutlineLeft
              style={{ cursor: 'pointer' }}
              onClick={getPrevMonth}
            />
            <p className='calendar-header__title'>
              {`${
                monthNames[selectedDate.getMonth()]
              },  ${selectedDate.getFullYear()}`}
            </p>
            <AiOutlineRight
              style={{ cursor: 'pointer' }}
              onClick={getNextMonth}
            />
          </div>
          <div className='calendar-container '>
            {radio &&
              radio.map((item, index) => (
                <div key={index} className='calendar-container__control'>
                  <input
                    checked={dayPicker === index}
                    className='calendar-container__control__input'
                    type='radio'
                    onChange={(e) => handleChangeRadio(e, index)}
                  />
                  <span className='calendar-container__control__title'>
                    {item}
                  </span>
                </div>
              ))}
          </div>
          <div style={{ margin: ' 0 -9px 0' }}>
            <table className='calendar-table'>
              <thead>
                <tr className='calendar-table__row-weeks'>
                  {daysShort.map((day) => (
                    <th key={day}>
                      <div className='hoverDay'>{day}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.values(calendarRows).map((cols: any, index) => {
                  return (
                    <tr
                      className={`${
                        valueWeek === index
                          ? 'calendar-table__row-day active-date'
                          : 'calendar-table__row-day'
                      }`}
                      key={index}
                    >
                      {cols.map((col: any) =>
                        col.date ? (
                          <td
                            key={col.date}
                            className={`${
                              valueDay === col.date ? 'active-day date' : 'date'
                            }`}
                            onClick={() => handelDayPicker(col.date, index)}
                          >
                            <div
                              className={`${
                                col.classes === ''
                                  ? 'date'
                                  : 'date isactive-day'
                              }`}
                            >
                              {col.value}
                            </div>
                          </td>
                        ) : (
                          ''
                        )
                      )}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default Calendar
