import React, { useState, useRef, useContext } from 'react'
import { Form, Col, FormGroup, Label, Input, Row, Button } from 'reactstrap'
import CustomModal from '../Modals/CustomModal'
import { useApolloClient } from 'react-apollo'
import useForm from 'lib/useForm'
import { CHANGE_PASSWORD_MUTATION } from 'constants/user'

const ChangePassword = (props) => {
  const client = useApolloClient()
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const { inputs, handleChange, resetForm } = useForm({
    oldPassword: '',
    password: '',
    confirmPassword: '',
  })

  const onSubmit = async (e) => {
    e.preventDefault()

    if (inputs.confirmPassword != inputs.password) {
      setError({
        message: 'New passwords are not match.',
      })
      return
    }

    await client.mutate({
      mutation: CHANGE_PASSWORD_MUTATION,
      variables: {
        password: inputs.password,
        oldPassword: inputs.oldPassword,
      },
    })

    setSuccess('Password changed.')
  }

    return (
        <CustomModal error={error} success={success} header="Change Password" size="sm" body={
            <Form onSubmit={onSubmit}>
                <Row>
                    <Col md="12">
                        <FormGroup>
                            <Label>Current Password</Label>
                            <Input
                                placeholder="Current Password"
                                type="password"
                                name="oldPassword"
                                value={inputs.oldPassword}
                                onChange={handleChange}
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col md="12">
                        <FormGroup>
                            <Label>New Password</Label>
                            <Input
                                placeholder="New Password"
                                type="password"
                                name="password"
                                value={inputs.password}
                                onChange={handleChange}
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col md="12">
                        <FormGroup>
                            <Label>Confirm New Password</Label>
                            <Input
                                placeholder="Confirm New Password"
                                type="password"
                                name="confirmPassword"
                                value={inputs.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </FormGroup>
                    </Col>
                </Row>
            </Form>
        } onSave={onSubmit} />
    );
};

export default ChangePassword
