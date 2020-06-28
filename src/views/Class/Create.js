import React, { useState, useContext } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'
import useForm from '../../lib/useForm'
import { FormWrapper, H3 } from '../Styled/index'
import { CREATE_CLASS_MUTATION } from '../../constants/class'
import Error from '../shared/ErrorMessage'
import Success from '../shared/SuccessMessage'

import { AuthContext } from '../../contexts/auth'
import { REFRESH_TOKEN } from 'views/Unauthenticated/Api'

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

const CreateClass = (props) => {
  const [success, setSuccess] = useState('')
  const { inputs, handleChange, resetForm } = useForm({
    name: '',
    code: '',
    teacher: '',
    students: [],
  })

  const [validation, setValidation] = useState(false)
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const [createClass, { error, loading }] = useMutation(CREATE_CLASS_MUTATION, {
    variables: inputs,
  })

  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <H3 className="title">Create Class</H3>
            </CardHeader>
            <Error error={error} />
            <Success success={success} />
            <CardBody>
              <Form
                onSubmit={async (e) => {
                  e.preventDefault()
                  setIsButtonDisabled(true)
                  // setValidation(true)
                  try {
                    await createClass(inputs)
                    setSuccess('Success')
                    resetForm()
                  } catch (err) {
                    console.log(err)
                  }

                  setIsButtonDisabled(false)

                  // props.history.goBack()
                }}
              >
                <Row className="p-3">
                  <Col md="12">
                    <FormGroup>
                      <label>Name</label>
                      <Input
                        placeholder="name"
                        type="text"
                        name="name"
                        value={inputs.name}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <FormGroup>
                      <label>Code</label>
                      <Input
                        placeholder="code"
                        type="text"
                        name="code"
                        value={inputs.code}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </Col>

                  <Col md="12">
                    <FormGroup>
                      <label>Teacher</label>
                      <Input
                        placeholder="Teacher"
                        type="text"
                        name="teacher"
                        value={inputs.teacher}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </Col>

                  <Col md="12" className="mt-1">
                    <Button
                      type="submit"
                      className="btn-fill"
                      color="primary"
                      disabled={isButtonDisabled}
                    >
                      Create Class
                    </Button>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default CreateClass
