import React from 'react'

export interface IServicePackProps {}

const ServicePack: React.FunctionComponent<IServicePackProps> = (props) => {
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(4)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  return <div>ServicePack</div>
}

export default ServicePack
