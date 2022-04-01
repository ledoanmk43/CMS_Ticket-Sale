import { DatePicker } from 'antd'
import moment from 'moment'
import React, { useRef, useEffect, useState } from 'react'
import Calendar from '../Components/Calendar'
import { Area } from '@antv/g2plot'

export interface IDashboardProps {}

const Dashboard: React.FunctionComponent<IDashboardProps> = (props) => {
  const [isCalendarSumOpen, setIsCalendarSumOpen] = useState<boolean>(false)
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false)

  // fetch(
  //   'https://gw.alipayobjects.com/os/bmw-prod/360c3eae-0c73-46f0-a982-4746a6095010.json'
  // )
  //   .then((res) => res.json())
  //   .then((data) => {
  //     const area = new Area('chart', {
  //       data,
  //       xField: 'timePeriod',
  //       yField: 'value',
  //       xAxis: {
  //         range: [0, 1],
  //       },
  //     })
  //     area.render()
  //   })
  const data = [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 },
  ]
  const line = new Line('container', {
    data,
    xField: 'year',
    yField: 'value',
  })

  line.render()

  return (
    <div className='main col pr-6rem'>
      <div className='container'>
        <p className='title_xl'> Thống kê</p>
        <div>
          <div id='chart'></div>
        </div>
        <div className='revenue'>
          <div className='section'>
            <p className='title'>Doanh thu</p>
            <DatePicker
              onClick={() => setIsCalendarSumOpen(!isCalendarSumOpen)}
              style={{ position: 'relative' }}
              defaultValue={moment(new Date(), 'DD MMM, YYYY')}
              defaultPickerValue={moment(new Date(), 'DD MMM, YYYY')}
              format={'MMM, YYYY'}
              allowClear={false}
            />
            {isCalendarSumOpen && (
              <Calendar
                onClickOutside={() => {
                  setIsCalendarSumOpen(false)
                }}
              />
            )}
          </div>
          <div className='section col-start'>
            <p className='sm-title'>Tổng doanh thu theo tuần</p>
            <p className='sum-revenue'>
              525.145.000 <span className='currency'>đồng</span>
            </p>
          </div>
          <div className='section row h-auto'>
            <DatePicker
              onClick={() => setIsCalendarOpen(!isCalendarOpen)}
              style={{ position: 'relative' }}
              defaultValue={moment(new Date(), 'DD MMM, YYYY')}
              defaultPickerValue={moment(new Date(), 'DD MMM, YYYY')}
              format={'MMM, YYYY'}
              allowClear={false}
            />
            {isCalendarOpen && (
              <Calendar
                onClickOutside={() => {
                  setIsCalendarOpen(false)
                }}
              />
            )}
            <div className='col-start h-auto mt-5rem'>
              <div className='hint row h-auto'>
                <div className='cube used '></div>
                <p>Vé đã sử dụng</p>
              </div>
              <div className='hint row h-auto'>
                <div className='cube ready'></div>
                <p>Vé chưa sử dụng</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
