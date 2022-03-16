import React from 'react'

export interface ISidebarProps {}

const Sidebar: React.FunctionComponent<ISidebarProps> = (props) => {
  return (
    <div className='sidebar'>
      <img
        className='sidebar-logo'
        srcSet='../asset/logox2.png 2x'
        alt='assad-asd'
      />
    </div>
  )
}

export default Sidebar
