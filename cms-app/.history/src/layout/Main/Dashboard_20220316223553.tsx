import React from 'react'

export interface IDashboardProps {}

const Dashboard: React.FunctionComponent<IDashboardProps> = (props) => {
  return (
    <div className='container'>
      <h2 className='statistic'> Thống kê</h2>
    </div>
  )
}

export default Dashboard
