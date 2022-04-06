import React from 'react'

export interface ITableAntdProps {}

const TableAntd: React.FunctionComponent<ITableAntdProps> = (props) => {
  return (
    <Table
      className='table-manage'
      rowKey='id'
      columns={columns}
      dataSource={ticketsData}
      pagination={{
        showTitle: false,
        position: ['bottomCenter'],
        current: page,
        pageSize: pageSize,
        onChange: (page, pageSize) => {
          setPage(page)
          setPageSize(pageSize)
        },
      }}
    ></Table>
  )
}

export default TableAntd
