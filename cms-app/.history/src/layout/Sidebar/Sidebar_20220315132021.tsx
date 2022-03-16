import React from 'react'

export interface ISidebarProps {}

const Sidebar: React.FunctionComponent<ISidebarProps> = (props) => {
  return (
    <div className='sidebar'>
      <img src='../asset/logo-insight.png' alt='logo-insight' />
    </div>
  )
}

export default Sidebar
