import React, { useRef, useEffect, useState } from 'react'
import { DatePicker, Space } from 'antd'
import moment from 'moment'

const { RangePicker } = DatePicker

const dateFormat = 'YYYY/MM/DD'
const weekFormat = 'MM/DD'
const monthFormat = 'YYYY/MM'

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY']

const customFormat = (value: { format: (arg0: string) => any }) =>
  `custom format: ${value.format(dateFormat)}`

const customWeekStartEndFormat = (value: moment.MomentInput) =>
  `${moment(value).startOf('week').format(weekFormat)} ~ ${moment(value)
    .endOf('week')
    .format(weekFormat)}`

export interface IDashboardProps {}

const Dashboard: React.FunctionComponent<IDashboardProps> = (props) => {
  return (
    <div className='dashboard'>
      <p className='statistic'> Thống kê</p>
      <div className='revenue'>
        <div className='body'>
          <p className='title'>Doanh thu</p>
          <Space direction='vertical' size={12}>
            <DatePicker
              defaultValue={moment('2015/01/01', dateFormat)}
              format={dateFormat}
            />
            <DatePicker
              defaultValue={moment('01/01/2015', dateFormatList[0])}
              format={dateFormatList}
            />
            <DatePicker
              defaultValue={moment('2015/01', monthFormat)}
              format={monthFormat}
              picker='month'
            />
            <DatePicker
              defaultValue={moment()}
              format={customWeekStartEndFormat}
              picker='week'
            />
            <RangePicker
              defaultValue={[
                moment('2015/01/01', dateFormat),
                moment('2015/01/01', dateFormat),
              ]}
              format={dateFormat}
            />
            <DatePicker
              defaultValue={moment('2015/01/01', dateFormat)}
              format={customFormat}
            />
          </Space>
          ,
        </div>

        <p className='sm-title'>Tổng doanh thu theo tuần</p>
        <p className='sum-revenue'>
          525.145.000 <span className='currency'>đồng</span>
        </p>
      </div>
    </div>
  )
}

export default Dashboard