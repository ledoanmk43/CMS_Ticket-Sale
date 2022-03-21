import React, { useRef, useEffect, useState } from 'react'
import type { ChartData, ChartArea } from 'chart.js'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { Chart } from 'react-chartjs-2'
// import { faker } from 'https://cdn.skypack.dev/@faker-js/faker@v6.6.6'
import { faker } from '@faker-js/faker'
// import { styled } from '@mui/material/styles'
// import TextField from '@mui/material/TextField'
// import AdapterDateFns from '@mui/lab/AdapterDateFns'
// import LocalizationProvider from '@mui/lab/LocalizationProvider'
// import StaticDatePicker from '@mui/lab/StaticDatePicker'
// import PickersDay from '@mui/lab/PickersDay'
// import endOfWeek from 'date-fns/endOfWeek'
// import isSameDay from 'date-fns/isSameDay'
// import isWithinInterval from 'date-fns/isWithinInterval'
// import startOfWeek from 'date-fns/startOfWeek'

import DateTimePicker from 'react-datetime-picker'
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
)

const labels = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7']
const colors = [
  'red',
  'orange',
  'yellow',
  'lime',
  'green',
  'teal',
  'blue',
  'purple',
]
export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
    },
  ],
}

function createGradient(ctx: CanvasRenderingContext2D, area: ChartArea) {
  const colorStart = faker.random.arrayElement(colors)
  const colorMid = faker.random.arrayElement(
    colors.filter((color) => color !== colorStart)
  )
  const colorEnd = faker.random.arrayElement(
    colors.filter((color) => color !== colorStart && color !== colorMid)
  )

  const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top)

  gradient.addColorStop(0, colorStart)
  gradient.addColorStop(0.5, colorMid)
  gradient.addColorStop(1, colorEnd)

  return gradient
}

export interface IDashboardProps {}

const Dashboard: React.FunctionComponent<IDashboardProps> = (props) => {
  const chartRef = useRef<ChartJS>(null)
  const [chartData, setChartData] = useState<ChartData<'bar'>>({
    datasets: [],
  })

  useEffect(() => {
    const chart = chartRef.current

    if (!chart) {
      return
    }

    const chartData = {
      ...data,
      datasets: data.datasets.map((dataset) => ({
        ...dataset,
        borderColor: createGradient(chart.ctx, chart.chartArea),
      })),
    }

    setChartData(chartData)
  }, [])
  return (
    <div className='dashboard'>
      <p className='statistic'> Thống kê</p>
      <div className='revenue'>
        <p className='title'>Doanh thu</p>
        <Chart className='chart' ref={chartRef} type='line' data={chartData} />
        <p className='sm-title'>Tổng doanh thu theo tuần</p>
        <p className='sum-revenue'>
          525.145.000 <span className='currency'>đồng</span>
        </p>
      </div>
    </div>
  )
}

export default Dashboard
