import React from 'react'

export interface IHeaderProps {}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  return (
    <div>
      <input type='text' placeholder='Search...' />
    </div>
  )
}

export default Header
