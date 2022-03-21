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
     <Space direction="vertical" size={12}>
    <DatePicker
      dateRender={current => {
        const style = {};
        if (current.date() === 1) {
          style.border = '1px solid #1890ff';
          style.borderRadius = '50%';
        }
        return (
          <div className="ant-picker-cell-inner" style={style}>
            {current.date()}
          </div>
        );
      }}
    />
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
