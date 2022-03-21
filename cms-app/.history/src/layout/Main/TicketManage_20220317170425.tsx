import React from 'react'

export interface ITicketManageProps {}

const TicketManage: React.FunctionComponent<ITicketManageProps> = (props) => {
  return (
    <div className='dashboard'>
      <p className='statistic'> Danh sách vé</p>
    </div>
  )
}

export default TicketManage
