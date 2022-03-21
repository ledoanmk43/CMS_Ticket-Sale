import React, { useRef, useEffect, useState } from 'react'
import { DatePicker, Space } from 'antd'
import moment from 'moment'

const { RangePicker } = DatePicker

const dateFormat = 'YYYY/MM/DD'
const weekFormat = 'MM/DD'
const monthFormat = 'YYYY/MM'

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY']

const customFormat = (value) => `custom format: ${value.format(dateFormat)}`

const customWeekStartEndFormat = (value) =>
  `${moment(value).startOf('week').format(weekFormat)} ~ ${moment(value)
    .endOf('week')
    .format(weekFormat)}`
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
        <div className='body'>
          <p className='title'>Doanh thu</p>
        </div>
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
