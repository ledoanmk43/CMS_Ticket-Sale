import React from 'react'

export interface IHeaderProps {}

const Header: React.FunctionComponent<{
  className: string
  setClassName: (className: string) => void
}> = (props) => {
  return (
    <div>
      <input type='text' placeholder='Search...' />
    </div>
  )
}

export default Header
