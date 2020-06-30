import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'
import useForm from '../../../lib/useForm'
import { FormWrapper, H3 } from '../../Styled/index'
import { USERS_QUERY } from '../../../constants/user'
import { CREATE_CLASS_CONTENT_MUTATION } from '../../../constants/class'
import Error from '../../shared/ErrorMessage'
import Success from '../../shared/SuccessMessage'

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
  Label,
  Row,
  Col,
} from 'reactstrap'

const CreateClassContent = (props) => {
  const [success, setSuccess] = useState('')
  const { inputs, handleChange, resetForm } = useForm({
    name: '',
    description: '',
  })

  const [isButtonDisabled, setIsButtonDisabled] = useState(false)

  const [createClassContent, { error, loading }] = useMutation(
    CREATE_CLASS_CONTENT_MUTATION,
    {
      variables: {
        ...inputs,
        classId: props.id,
      },
    }
  )

  if (loading) return <p>Loading...</p>
  if (error) return `Error! ${error}`

  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <H3 className="title">Create Class Content</H3>
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
                    await createClassContent(inputs)
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
                      <Label>Name</Label>
                      <Input
                        placeholder="Name"
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
                      <Label>Description</Label>
                      <Input
                        placeholder="Description"
                        type="text"
                        name="description"
                        value={inputs.description}
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
                      Create Content
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

export default CreateClassContent
