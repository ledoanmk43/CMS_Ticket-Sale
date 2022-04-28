import dateFormat from 'dateformat'
import React from 'react'
import { CSVLink } from 'react-csv'

export interface ICSVbuttonProps {
  debounceSearch: any
  tableData: any
  defaultData: any
}

const CSVbutton: React.FunctionComponent<ICSVbuttonProps> = (
  props: ICSVbuttonProps
) => {
  return (
    <CSVLink
      data={props.debounceSearch.length ? props.tableData : props.defaultData}
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