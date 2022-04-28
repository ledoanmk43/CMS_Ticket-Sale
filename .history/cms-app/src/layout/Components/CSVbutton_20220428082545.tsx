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
  const headers = [
    { label: 'STT', key: 'id' },
    { label: 'Booking Code', key: 'bookingId' },
    { label: 'Số vé', key: 'ticketId' },
    { label: 'Tình trạng sử dụng', key: 'status' },
    { label: 'Ngày sử dụng', key: 'dateUse' },
    { label: 'Ngày xuất vé', key: 'dateRelease' },
    { label: 'Cổng check-in', key: 'gate' },
  ]
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
