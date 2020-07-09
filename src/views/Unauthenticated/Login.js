import React, { useState, useContext } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'
import useForm from 'lib/useForm'
import { FormWrapper, H3 } from 'views/Styled/index'
import Error from 'views/shared/ErrorMessage'

import { AuthContext } from 'contexts/auth'
import { REFRESH_TOKEN_MUTATION } from 'views/Unauthenticated/Api'

// reactstrap components
import {
  Alert,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  FormFeedback,
  Form,
  Input,
  Row,
  Col,
} from 'reactstrap'
import { USER_LOGIN_MUTATION } from 'constants/auth'

const Login = (props) => {
  const { inputs, handleChange, resetForm } = useForm({
    username: 'teacher85',
    password: 'password',
  })

  const [validation, setValidation] = useState(false)
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const [login, { error, loading }] = useMutation(USER_LOGIN_MUTATION, {
    variables: inputs,
  })
  // const [error, setError] = useState('')

  const authContext = useContext(AuthContext)

  const [refreshToken, {}] = useMutation(REFRESH_TOKEN_MUTATION)

  return (
    <FormWrapper className="px-4">
      <Row style={{ maxWidth: 700 }}>
        <Col md="12">
          <Card>
            <CardHeader>
              <H3 className="title">Login</H3>
            </CardHeader>
            <Error error={error} />
            <CardBody>
              <Form
                onSubmit={async (e) => {
                  e.preventDefault()
                  setIsButtonDisabled(true)
                  // setValidation(true)
                  try {
                    await authContext.login(login, authContext, refreshToken)
                    setIsButtonDisabled(false)

                    props.history.push('/')
                  } catch (e) {
                    setIsButtonDisabled(false)
                  }
                }}
              >
                <Row className="p-3">
                  <Col md="12">
                    <FormGroup>
                      <label>Username</label>
                      <Input
                        placeholder="Username, Phone, or Email"
                        type="text"
                        name="username"
                        value={inputs.username}
                        onChange={handleChange}
                        required
                      />
                      <FormFeedback>
                        You will not be able to see this
                      </FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <FormGroup>
                      <label>Password</label>
                      <Input
                        placeholder="********"
                        type="password"
                        name="password"
                        value={inputs.password}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </Col>

                  <Col md="12" className="mb-4">
                    <Link to="/forgot-password">Forgot Password?</Link>
                  </Col>

                  <Col md="12" className="mt-1">
                    <Button
                      type="submit"
                      className="btn-fill animation-on-hover"
                      color="primary"
                      disabled={isButtonDisabled}
                    >
                      Login
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

export default Login
