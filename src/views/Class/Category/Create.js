import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'
import useForm from 'lib/useForm'
import { FormWrapper, H3 } from 'views/Styled/index'
import { USERS_QUERY } from 'constants/user'
import { CREATE_CLASS_CATEGORY_MUTATION } from 'constants/class'
import Error from 'views/shared/ErrorMessage'
import Success from 'views/shared/SuccessMessage'

// reactstrap components
import { Alert, Button, Card, CardHeader, CardBody, CardFooter, CardText, FormGroup, FormFeedback, Form, Input, Label, Row, Col } from 'reactstrap'

const CreateClassCategory = (props) => {
  const [success, setSuccess] = useState('')
  const { inputs, handleChange, resetForm } = useForm({
    name: '',
    weight: '',
  })

  const [isButtonDisabled, setIsButtonDisabled] = useState(false)

  const [createClassCategory, { error, loading }] = useMutation(CREATE_CLASS_CATEGORY_MUTATION, {
    variables: {
      ...inputs,
      classId: props.id,
    },
  })

  if (loading) return <p>Loading...</p>

  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <H3 className="title">Create Class Category</H3>
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
                    await createClassCategory(inputs)
                    setSuccess('Success')
                    resetForm()
                    props.history.push(`/class/${props.id}/category`)
                  } catch (err) {
                    setIsButtonDisabled(false)
                  }
                }}
              >
                <Row className="p-3">
                  <Col md="12">
                    <FormGroup>
                      <Label>Name</Label>
                      <Input placeholder="Name" type="text" name="name" value={inputs.name} onChange={handleChange} required />
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <FormGroup>
                      <Label>weight</Label>
                      <Input placeholder="weight" type="number" name="weight" value={inputs.weight} onChange={handleChange} required />
                    </FormGroup>
                  </Col>

                  <Col md="12" className="mt-1">
                    <Button type="submit" className="btn-fill" color="primary" disabled={isButtonDisabled}>
                      Create Category
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

export default CreateClassCategory
