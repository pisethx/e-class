import React, { useContext, useState, useEffect } from 'react'
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks'
import { USER_QUERY, UPDATE_USER_QUERY } from 'constants/user'
import useForm from 'lib/useForm'

const UserEdit = (props) => {
  const client = useApolloClient()

  const [form, setForm] = useForm({})
  const { inputs, handleChange, resetForm } = useForm(form)

  const { loading, error, data } = useQuery(USER_QUERY, {
    variables: {
      id: props.id,
    },
  })

  const [updateUser] = useMutation(UPDATE_USER_QUERY, {
    variables: {
      id: props.id,
      ...form,
    },
  })

  if (loading) return <Spinner />
  if (error) return console.log(error)

  if (data) {
    setForm(data?.user)
  }
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <H3 className="title">Edit Class</H3>
              </CardHeader>
              <Error error={error} />
              <Success success={success} />
              <CardBody>
                {Object.values(form) && (
                  <Form
                    onSubmit={async (e) => {
                      e.preventDefault()
                      setIsButtonDisabled(true)
                      // setValidation(true)
                      try {
                        const { data } = await updateUser(form)
                        setSuccess('Success')
                      } catch (err) {
                        console.log(err)
                      }

                      setIsButtonDisabled(false)
                    }}
                  >
                    <Row className="p-3">
                      <Col md="12">
                        <FormGroup>
                          <Label>Username</Label>
                          <Input placeholder="Username" type="text" name="username" value={inputs.username} onChange={handleChange} required />
                        </FormGroup>
                      </Col>
                      <Col md="12">
                        <FormGroup>
                          <Label>Email</Label>
                          <Input placeholder="email" type="email" name="email" value={inputs.email} onChange={handleChange} required />
                        </FormGroup>
                      </Col>
                      <Col md="12">
                        <FormGroup>
                          <Label>UUID</Label>
                          <Input placeholder="uuid" type="text" name="uuid" value={inputs.uuid} onChange={handleChange} required />
                        </FormGroup>
                      </Col>
                      <Col md="12">
                        <FormGroup>
                          <Label>Password</Label>
                          <Input placeholder="password" type="password" name="password" value={inputs.password} onChange={handleChange} required />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default UserEdit
