import React, { useState, useRef, useContext } from 'react'
import { Form, Col, FormGroup, Label, Input, Row, Button, ModalHeader, ModalBody, ModalFooter, Modal } from 'reactstrap'
import CustomModal from '../Modals/CustomModal'
import { useApolloClient } from 'react-apollo'
import Error from 'views/shared/ErrorMessage'

const Delete = (props) => {
  const [modalShow, setModalShow] = useState(false)
  const [error, setError] = useState('')
  const client = useApolloClient()

  const onDelete = async (e) => {
    e.preventDefault()

    try {
      await client.mutate({
        mutation: props.deleteMutation,
        variables: { id: props.id },
        refetchQueries: true,
      })
    } catch (e) {
      setError('Something went wrong')
      console.log(e)
    }

    setModalShow(false)
    window.location.reload(false)
  }

  return (
    <span>
      <Button className="mr-3 my-1 animation-on-hover" color="danger" size="sm" onClick={() => setModalShow(true)}>
        Delete
      </Button>
      <Modal isOpen={modalShow} backdrop={false} toggle={() => setModalShow((prev) => !prev)}>
        <Row>
          <Error error={error} />
        </Row>
        <ModalHeader toggle={() => setModalShow(false)}>Confirmation</ModalHeader>
        <ModalBody>Do you really want to delete {props.name}?</ModalBody>
        <ModalFooter>
          <Button className="mr-3 my-1 animation-on-hover" color="danger" onClick={onDelete}>
            Delete
          </Button>
          <Button color="secondary" onClick={() => setModalShow(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </span>
  )
}

export default Delete
