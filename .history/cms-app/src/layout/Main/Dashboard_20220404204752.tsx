import { DatePicker } from 'antd'
import moment from 'moment'
import React, { useRef, useEffect, useState } from 'react'
import Calendar from '../Components/Calendar'
import { Area } from '@ant-design/plots'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import {
  Doughnut,
  // getDatasetAtEvent,
  // getElementAtEvent,
  // getElementsAtEvent,
} from 'react-chartjs-2'
ChartJS.register(ArcElement, Tooltip, Legend)

export interface IDashboardProps {}

const Dashboard: React.FunctionComponent<IDashboardProps> = (props) => {
  const [isCalendarSumOpen, setIsCalendarSumOpen] = useState<boolean>(false)
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false)

  //area chart
  const [dataArea, setDataArea] = useState([])
  const asyncFetch = async () => {
    await fetch(
      'https://gw.alipayobjects.com/os/bmw-prod/360c3eae-0c73-46f0-a982-4746a6095010.json'
    )
      .then((response) => response.json())
      .then((json) => setDataArea(json))
      .catch((error) => {
        console.log('fetch data failed', error)
      })
  }
  const configArea = {
    data: dataArea,
    xField: 'timePeriod',
    yField: 'value',
    xAxis: {
      range: [0, 1],
    },
    smooth: true,
    areaStyle: {
      fill: 'l(270) 0:#ffffff 0.5:#fef3ed 1:#feede1',
      fillOpacity: 0.7,
      stroke: 'white',
      lineWidth: 2,
      strokeOpacity: 1,
      shadowOffsetX: 10,
      shadowOffsetY: 10,
      cursor: 'pointer',
    },
    line: {
      size: 3,
    },
    color: '#f7a156',
  }

  //donut chart
  const chartRef: any = useRef(null)
  const [dataDoughnut, setDataDoughnut] = useState<any>({
    datasets: [],
  })

  useEffect(() => {
    setDataDoughnut({
      labels: [],
      datasets: [
        {
          data: [40, 60],
          backgroundColor: ['#4F75FF', '#FF8A48'],
        },
      ],
    })
    asyncFetch()
  }, [])
  return (
    <div className='main col'>
      <div className='container pr-3rem'>
        <p className='title_xl'> Thống kê</p>
        <div className='revenue'>
          <div className='section mt-3rem'>
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
          <div className='chart'>
            <Area {...configArea} style={{ backgroundColor: 'white' }} />
          </div>
          <div className='section col-start'>
            <p className='sm-title'>Tổng doanh thu theo tuần</p>
            <p className='sum-revenue'>
              525.145.000 <span className='currency'>đồng</span>
            </p>
          </div>
          <div
            style={{
              justifyContent: 'flex-start',
              marginRight: '10rem !important',
            }}
            className='section start row h-auto'
          >
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
            <div className='row '>
              <div
                className='col-center'
                style={{ backgroundColor: 'white', maxWidth: '325px' }}
              >
                <p
                  style={{
                    padding: '0 14rem 0.5rem 11rem',
                    whiteSpace: 'nowrap',
                  }}
                  className='title'
                >
                  Gói gia đình
                </p>
                <Doughnut
                  ref={chartRef}
                  data={dataDoughnut}
                  style={{ maxHeight: '200px' }}
                />
              </div>
              <div
                className='col-center'
                style={{ backgroundColor: 'white', maxWidth: '325px' }}
              >
                <p
                  style={{
                    padding: '0 14rem 0.5rem 11rem',
                    whiteSpace: 'nowrap',
                  }}
                  className='title'
                >
                  Gói sự kiện
                </p>
                <Doughnut
                  ref={chartRef}
                  data={dataDoughnut}
                  style={{ maxHeight: '200px' }}
                />
              </div>
            </div>
            <div className='col-start h-auto mt-4rem'>
              <div className='hint row h-auto'>
                <div className='cube used '></div>
                <p style={{ whiteSpace: 'nowrap' }}>Vé đã sử dụng</p>
              </div>
              <div className='hint row h-auto'>
                <div className='cube ready'></div>
                <p style={{ whiteSpace: 'nowrap' }}>Vé chưa sử dụng</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
