import { DatePicker } from 'antd'
import moment from 'moment'
import React, { useRef, useEffect, useState } from 'react'
import Calendar from '../Components/Calendar'
import { Area } from '@ant-design/plots'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import {
  Doughnut,
  getDatasetAtEvent,
  getElementAtEvent,
  getElementsAtEvent,
} from 'react-chartjs-2'
export interface IDashboardProps {}

const Dashboard: React.FunctionComponent<IDashboardProps> = (props) => {
  const [isCalendarSumOpen, setIsCalendarSumOpen] = useState<boolean>(false)
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false)

  //area chart
  const [data, setData] = useState([])
  useEffect(() => {
    asyncFetch()
  }, [])
  const asyncFetch = () => {
    fetch(
      'https://gw.alipayobjects.com/os/bmw-prod/360c3eae-0c73-46f0-a982-4746a6095010.json'
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error)
      })
  }
  const configArea = {
    data,
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
  const chartRef = useRef(null)
  const [chartData, setChartData] = useState({
    datasets: [],
  })

  const dataChart = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }
  return (
    <div className='main col pr-3rem'>
      <div className='wrapper-container'>
        <p className='title_xl'> Thống kê</p>
        <div className='conmtainer-revenue'>
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
          <div className='section start row h-auto'>
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
            <div className='chart row'>
              <Doughnut
                ref={chartRef}
                data={dataChart}
                onClick={(event) => {
                  const dataset = getDatasetAtEvent(chartRef.current, event)
                  const element = getElementAtEvent(chartRef.current, event)
                  const elements = getElementsAtEvent(chartRef.current, event)
                }}
              />
              {/* <Pie
                {...configPie}
                style={{ backgroundColor: 'white' }}
                className='h-auto'
              />
              <Pie
                {...configPie}
                style={{ backgroundColor: 'white' }}
                className='h-auto'
              /> */}
            </div>
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
