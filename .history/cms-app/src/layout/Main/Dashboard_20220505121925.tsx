import { DatePicker } from 'antd'
import moment from 'moment'
import React, { useRef, useEffect, useState } from 'react'
import Calendar from '../Components/Calendar'
import { Area } from '@ant-design/plots'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { Ticket } from './Home'
ChartJS.register(ArcElement, Tooltip, Legend)

export interface IDashboardProps {
  ticketsData: Ticket | undefined | any
}

const Dashboard: React.FunctionComponent<IDashboardProps> = (
  props: IDashboardProps
) => {
  const [isCalendarSumOpen, setIsCalendarSumOpen] = useState<boolean>(false)
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false)

  //area chart
  const [dataArea, setDataArea] = useState([])
  const hanleDashboard = () => {
    setDataArea(
      props.ticketsData
        .map((item: any) => {
          const date = item.dateUse.toDate().toLocaleDateString('en-GB')
          return {
            dateUse:
              item.dateUse.toDate().getMonth() +
              item.dateUse.toDate().getMonth(),
            price: item.price,
          }
        })
        .sort((a: any, b: any) => a.dateUse - b.dateUse)
    )
  }
  const configArea = {
    data: dataArea,
    xField: 'dateUse',
    yField: 'price',
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
    hanleDashboard()
  }, [props.ticketsData])
  console.log('dataArea n??', dataArea)

  return (
    <div className='main col'>
      <div className='container pr-3rem'>
        <p className='title_xl'> Th???ng k??</p>
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
            <p className='sm-title'>T???ng doanh thu theo tu???n</p>
            <p className='sum-revenue'>
              525.145.000 <span className='currency'>?????ng</span>
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
                  G??i gia ????nh
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
                  G??i s??? ki???n
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
                <p style={{ whiteSpace: 'nowrap' }}>V?? ???? s??? d???ng</p>
              </div>
              <div className='hint row h-auto'>
                <div className='cube ready'></div>
                <p style={{ whiteSpace: 'nowrap' }}>V?? ch??a s??? d???ng</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
