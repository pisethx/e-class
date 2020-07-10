import React, { useState, useRef, useContext } from 'react'
import { Form, Col, FormGroup, Label, Input, Row, Button } from 'reactstrap'
import CustomModal from '../Modals/CustomModal'
import { useApolloClient } from 'react-apollo'
import useForm from 'lib/useForm'
import { CHANGE_PASSWORD_MUTATION } from 'constants/user'
import { UPDATE_FORUM_MUTATION } from 'constants/forum'

const EditForum = (props) => {
  const client = useApolloClient()
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const { inputs, handleChange, resetForm } = useForm({
    title: props.title,
    description: props.description,
  })

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      await client.mutate({
        mutation: UPDATE_FORUM_MUTATION,
        variables: {
          id: props.id,
          title: inputs.title,
          description: inputs.description,
        },
      })
      props.refetch()
    } catch (e) {
      setError({
        message: e.message
      })
    }

    setSuccess('Forum updated.')
  }

  return (
    <CustomModal
      error={error}
      success={success}
      header="Edit"
      size="sm"
      body={
        <Form onSubmit={onSubmit}>
          <Row>
            <Col md="12">
              <FormGroup>
                <Label>Title</Label>
                <Input placeholder="Title" type="text" name="title" value={inputs.title} onChange={handleChange} required />
              </FormGroup>
            </Col>
            <Col md="12">
              <FormGroup>
                <Label>Description</Label>
                <Input placeholder="Description" type="text" name="description" value={inputs.description} onChange={handleChange} required />
              </FormGroup>
            </Col>
          </Row>
        </Form>
      }
      onSave={onSubmit}
    />
  )
}

export default EditForum
