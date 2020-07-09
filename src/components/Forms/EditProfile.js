import React, { useState, useContext } from 'react'
import CustomModal from '../Modals/CustomModal'
import { Form, Col, FormGroup, Label, Input, Row, Button } from 'reactstrap'
import useForm from 'lib/useForm'
import { UPDATE_USER_MUTATION } from 'constants/user'
import { useApolloClient, useQuery } from '@apollo/react-hooks'
import { GET_ENUM_QUERY } from 'views/Unauthenticated/Api'
import { ROLES_QUERY } from 'constants/auth'

const EditProfile = (props) => {
  const GENDERS = useQuery(GET_ENUM_QUERY, {
    variables: { name: 'Gender' },
  })
  const ROLES = useQuery(ROLES_QUERY)

  const client = useApolloClient()
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const { inputs, handleChange, resetForm } = useForm({
    id: props.user.id,
    uuid: props.user.uuid,
    email: props.user.email,
    username: props.user.username,
    first_name: props.user.identity.first_name,
    last_name: props.user.identity.last_name,
    gender: props.user.identity.gender,
    role_id: props.user.roles[0].id,
  })

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      await client.mutate({
        mutation: UPDATE_USER_MUTATION,
        awaitRefetchQueries: true,
        variables: { ...inputs },
      })
    } catch (e) {
      setError(e)
    }

    setSuccess('Success')
  }

  return (
    <CustomModal
      error={error}
      success={success}
      header="Edit"
      size={props.size}
      body={
        <Form onSubmit={onSubmit}>
          <Row>
            <h1 className="pl-3">{props.user.identity.first_name + ' ' + props.user.identity.last_name}</h1>
          </Row>
          <Row>
            <Col md="12">
              <FormGroup>
                <Label>Uuid</Label>
                <Input placeholder="Uuid" type="text" name="uuid" value={inputs.uuid} onChange={handleChange} required />
              </FormGroup>
            </Col>
            <Col md="12">
              <FormGroup>
                <Label>Username</Label>
                <Input placeholder="Username" type="text" name="username" value={inputs.username} onChange={handleChange} required />
              </FormGroup>
            </Col>
            <Col md="12">
              <FormGroup>
                <Label>Email</Label>
                <Input placeholder="Email" type="email" name="email" value={inputs.email} onChange={handleChange} required />
              </FormGroup>
            </Col>
            <Col sm="12">
              <FormGroup>
                <Label>Role</Label>
                <Input type="select" name="role_id" value={inputs.role_id} onChange={handleChange} required>
                  {ROLES?.data &&
                    ROLES.data.roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                </Input>
              </FormGroup>
            </Col>
            <Col sm="6">
              <FormGroup>
                <label>First Name</label>
                <Input placeholder="Elon" type="text" name="first_name" value={inputs.first_name} onChange={handleChange} />
              </FormGroup>
            </Col>
            <Col sm="6">
              <FormGroup>
                <label>Last Name</label>
                <Input placeholder="Musk" type="text" name="last_name" value={inputs.last_name} onChange={handleChange} />
              </FormGroup>
            </Col>
            <Col sm="12">
              <FormGroup>
                <Label>Gender</Label>
                <Input type="select" name="gender" value={inputs.gender} onChange={handleChange} required>
                  {GENDERS?.data &&
                    GENDERS.data.__type.enumValues.map(({ name }) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                </Input>
              </FormGroup>
            </Col>
          </Row>
        </Form>
      }
      onSave={onSubmit}
    />
  )
}

export default EditProfile
