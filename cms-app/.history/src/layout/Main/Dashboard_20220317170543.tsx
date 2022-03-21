import React, { useRef, useEffect, useState } from 'react'

export interface IDashboardProps {}

const Dashboard: React.FunctionComponent<IDashboardProps> = (props) => {
  return (
    <div className='container'>
      <p className='title_xl'> Thống kê</p>
      <div className='revenue'>
        <div className='body'>
          <p className='title'>Doanh thu</p>
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
