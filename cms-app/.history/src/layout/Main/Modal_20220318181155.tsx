import React from 'react'

export interface IModalProps {}

const Modal: React.FunctionComponent<IModalProps> = (props) => {
  return (
    <Modal>
      <p>some contents...</p>
      <p>some contents...</p>
      <p>some contents...</p>
    </Modal>
  )
}

export default Modal
