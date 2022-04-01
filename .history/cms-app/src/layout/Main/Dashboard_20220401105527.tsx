import { DatePicker } from 'antd'
import moment from 'moment'
import React, { useRef, useEffect, useState } from 'react'
import Calendar from '../Components/Calendar'

export interface IDashboardProps {}

const Dashboard: React.FunctionComponent<IDashboardProps> = (props) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false)

  return (
    <div className='main pr-4rem'>
      <div className='container'>
        <p className='title_xl'> Thống kê</p>
        <div className='revenue'>
          <div className='section'>
            <p className='title'>Doanh thu</p>
            <DatePicker
              onClick={() => setIsCalendarOpen(!isCalendarOpen)}
              style={{ position: 'relative' }}
              defaultValue={moment(new Date(), 'DD MMM, YYYY')}
              defaultPickerValue={moment(new Date(), 'DD MMM, YYYY')}
              format={'DD/MM/YYYY'}
              allowClear={false}
            />
            {isCalendarOpen && (
              <Calendar
                onClickOutside={() => {
                  setIsCalendarOpen(false)
                }}
              />
            )}
          </div>
          <div className='section start'>
            <p className='sm-title'>Tổng doanh thu theo tuần</p>
            <p className='sum-revenue'>
              525.145.000 <span className='currency'>đồng</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
