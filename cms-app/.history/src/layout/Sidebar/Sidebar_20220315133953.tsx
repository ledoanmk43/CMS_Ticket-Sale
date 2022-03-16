import React from 'react'

export interface ISidebarProps {}

const Sidebar: React.FunctionComponent<ISidebarProps> = (props) => {
  return (
    <div className='sidebar'>
      <img
        className='sidebar-logo'
        src='../asset/logo.png 2x'
        alt='logo-insight'
      />
    </div>
  )
}

export default Sidebar
