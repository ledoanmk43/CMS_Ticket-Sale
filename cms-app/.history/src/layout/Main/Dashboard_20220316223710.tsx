import React from 'react'

export interface IDashboardProps {}

const Dashboard: React.FunctionComponent<IDashboardProps> = (props) => {
  return (
    <div className='main-container'>
      <p className='statistic'> Thống kê</p>
    </div>
  )
}

export default Dashboard
