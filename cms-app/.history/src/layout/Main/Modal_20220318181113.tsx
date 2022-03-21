import React from 'react'

export interface IModalProps {}

const Modal: React.FunctionComponent<IModalProps> = (props) => {
  return (
    <Modal title='Vertically centered modal dialog' centered>
      <p>some contents...</p>
      <p>some contents...</p>
      <p>some contents...</p>
    </Modal>
  )
}

export default Modal
