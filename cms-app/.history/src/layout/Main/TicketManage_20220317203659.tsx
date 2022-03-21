import React from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { FiFilter } from 'react-icons/fi'

export interface ITicketManageProps {}

const TicketManage: React.FunctionComponent<ITicketManageProps> = (props) => {
  return (
    <div className='container'>
      <p className='title_xl'> Danh sách vé</p>
      <div className='section'>
        <div className='section-search'>
          <input
            className='section-search-input'
            type='text'
            placeholder='Tìm bằng số vé'
          />
          <SearchOutlined className='header-search-icon' />
        </div>
        <div className='filter'>
          <button className='btn-ticket'>
            <FiFilter className='icon' />
            Lọc vé
          </button>
          <button className='btn-ticket export'>Xuất file </button>
        </div>
      </div>
      <div className='section'>
        {' '}
        <Table dataSource={data}>
          <ColumnGroup title='Name'>
            <Column title='First Name' dataIndex='firstName' key='firstName' />
            <Column title='Last Name' dataIndex='lastName' key='lastName' />
          </ColumnGroup>
          <Column title='Age' dataIndex='age' key='age' />
          <Column title='Address' dataIndex='address' key='address' />
          <Column
            title='Tags'
            dataIndex='tags'
            key='tags'
            render={(tags) => (
              <>
                {tags.map((tag) => (
                  <Tag color='blue' key={tag}>
                    {tag}
                  </Tag>
                ))}
              </>
            )}
          />
          <Column
            title='Action'
            key='action'
            render={(text, record) => (
              <Space size='middle'>
                <a>Invite {record.lastName}</a>
                <a>Delete</a>
              </Space>
            )}
          />
        </Table>
        ,
      </div>
    </div>
  )
}

export default TicketManage
