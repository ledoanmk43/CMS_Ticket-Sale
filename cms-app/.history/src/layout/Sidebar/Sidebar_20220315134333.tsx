import React from 'react'

export interface ISidebarProps {}

const Sidebar: React.FunctionComponent<ISidebarProps> = (props) => {
  return (
    <div className='sidebar'>
      <img className='sidebar-logo' srcSet='../asset/logo2x.png 2x' alt='' />
    </div>
  )
}

export default Sidebar
