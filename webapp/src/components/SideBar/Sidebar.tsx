import React from 'react'
import { Offcanvas } from 'react-bootstrap';

type Props = {
    handleClose: (state:boolean) => void
}

const Sidebar = ({handleClose}: Props) => {
  return (
    <Offcanvas show={true} onHide={() => handleClose(false)}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Carrito de compra</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Cart
        </Offcanvas.Body>
      </Offcanvas>
  )
}

export default Sidebar;