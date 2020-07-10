import React, { useState } from 'react'
import Error from 'views/shared/ErrorMessage'
import Success from 'views/shared/SuccessMessage'

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Card } from 'reactstrap'

const CustomModal = (props) => {
  const [modalShow, setModalShow] = useState(false)

  return (
    <span>
      <Button className="mr-3 my-1 animation-on-hover" size={props.size} onClick={() => setModalShow(true)}>
        {props.header}
      </Button>

      <Modal isOpen={modalShow} backdrop={true} toggle={() => setModalShow((prev) => !prev)} contentClassName="bg-dark">
        <Card className="m-0">
          <Row>
            <Error error={props.error} />
            <Success success={props.success} />
          </Row>
          <ModalHeader toggle={() => setModalShow(false)}>
            <span className="text-light">{props.header}</span>
          </ModalHeader>
          <ModalBody>{props.body}</ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={props.onSave}>
              Save
            </Button>
            <Button color="secondary" onClick={() => setModalShow(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </Card>
      </Modal>
    </span>
  )
}

export default CustomModal
