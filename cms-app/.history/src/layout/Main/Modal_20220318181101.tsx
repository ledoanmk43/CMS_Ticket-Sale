import React from 'react'

export interface IModalProps {}

const Modal: React.FunctionComponent<IModalProps> = (props) => {
  return (
    <Modal
      title='Vertically centered modal dialog'
      centered
      visible={isOpenModal}
      onOk={() => setIsOpenModal(false)}
    >
      <p>some contents...</p>
      <p>some contents...</p>
      <p>some contents...</p>
    </Modal>
  )
}

export default Modal
