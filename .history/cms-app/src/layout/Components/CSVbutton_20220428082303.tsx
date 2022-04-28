import React from 'react'

export interface ICSVbuttonProps {}

const CSVbutton: React.FunctionComponent<ICSVbuttonProps> = (props) => {
  return (
    <CSVLink
      data={debounceSearch.length ? tableData : defaultData}
      filename={`Quản lý vé - ${dateFormat(
        new Date().toLocaleString('en-us'),
        'dd/mm/yyyy (hh MM TT)'
      )}`}
      headers={headers}
      target='_blank'
      className='btn-ticket export'
    >
      Xuất file{' (.csv)'}
    </CSVLink>
  )
}

export default CSVbutton
