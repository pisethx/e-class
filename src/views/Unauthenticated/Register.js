import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useMutation, useQuery } from '@apollo/react-hooks'
import useForm from 'lib/useForm'
import { FormWrapper, H3 } from 'views/Styled/index'
import { GET_ENUM_QUERY, USER_REGISTER_MUTATION } from './Api'
import Error from 'views/shared/ErrorMessage'

import {
  Alert,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Label,
  Row,
  Col,
} from 'reactstrap'

const Register = (props) => {
  const GENDERS = useQuery(GET_ENUM_QUERY, {
    variables: { name: 'Gender' },
  })

  const { inputs, handleChange, resetForm } = useForm({
    username: '',
    password: '',
    email: '',
    first_name: '',
    last_name: '',
  })

  const [gender, setGender] = useState(null)
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)

  const [register, { data, error, loading }] = useMutation(
    USER_REGISTER_MUTATION,
    {
      variables: { ...inputs, gender },
    }
  )

  if (GENDERS.loading) return null
  if (GENDERS.error) return 'Error'

  return (
    <FormWrapper className="px-3">
      <Row style={{ maxWidth: 900 }}>
        <Col sm="12">
          <Card className="form">
            <CardHeader>
              <H3 className="title">Register</H3>
            </CardHeader>{' '}
            <Error error={error} />
            <CardBody>
              <Form
                onSubmit={async (e) => {
                  e.preventDefault()
                  let res
                  try {
                    res = await register()
                    // handle data
                    props.history.push('/login')
                  } catch {}
                }}
              >
                <Row className="p-3">
                  <Col sm="6">
                    <FormGroup>
                      <label>First Name</label>
                      <Input
                        placeholder="Elon"
                        type="text"
                        name="first_name"
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="6">
                    <FormGroup>
                      <label>Last Name</label>
                      <Input
                        placeholder="Musk"
                        type="text"
                        name="last_name"
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="12">
                    <FormGroup>
                      <Label>Gender</Label>
                      <Input
                        type="select"
                        name="select"
                        onChange={(e) => setGender(e.target.value)}
                        required
                      >
                        <option value="" defaultValue>
                          Select a Gender
                        </option>
                        {GENDERS.data.__type.enumValues.map(({ name }) => (
                          <option key={name} value={name}>
                            {name}
                          </option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col sm="12">
                    <FormGroup>
                      <label>Email</label>
                      <Input
                        placeholder="elonmusk@gmail.com"
                        type="text"
                        name="email"
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="12">
                    <FormGroup>
                      <label>Username</label>
                      <Input
                        placeholder="Username"
                        type="text"
                        name="username"
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="12">
                    <FormGroup>
                      <label>Password</label>
                      <Input
                        placeholder="********"
                        type="password"
                        name="password"
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>

                  <Col sm="12" className="mt-1">
                    <Button
                      type="submit"
                      className="btn-fill"
                      color="primary"
                      disabled={isButtonDisabled}
                    >
                      Register
                    </Button>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </FormWrapper>
  )
}

export default Register
