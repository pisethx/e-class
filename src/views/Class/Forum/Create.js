import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'
import useForm from 'lib/useForm'
import { FormWrapper, H3 } from 'views/Styled/index'
import { CLASS_CONTENT_QUERY } from 'constants/class'
import { CREATE_FORUM_MUTATION } from 'constants/forum'
import Error from 'views/shared/ErrorMessage'
import Success from 'views/shared/SuccessMessage'
import Select from 'react-select'

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

const CreateClassForum = (props) => {
  const [success, setSuccess] = useState('')
  const { inputs, handleChange, resetForm } = useForm({
    title: '',
    description: '',
    classContentId: '',
  })

  const [form, setForm] = useState({
    classContentId: null,
  })

  const CLASS_CONTENT_RES = useQuery(CLASS_CONTENT_QUERY, {
    variables: {
      id: props.id,
    },
  })

  let classContents = []
  if (CLASS_CONTENT_RES?.data) {
    console.log(CLASS_CONTENT_RES)
    classContents = (CLASS_CONTENT_RES?.data?.class?.class_contents).map(
      ({ name, id }) => ({
        value: id,
        label: name,
      })
    )
  }

  const [isButtonDisabled, setIsButtonDisabled] = useState(false)

  const [createClassForum, { error, loading }] = useMutation(
    CREATE_FORUM_MUTATION,
    {
      variables: {
        ...inputs,
        classId: props.id,
        classContentId: form?.classContentId?.value,
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
              <H3 className="title">Post a Forum</H3>
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
                    await createClassForum(inputs)
                    setSuccess('Success')
                    props.history.push(`/class/${props.id}/content`)
                  } catch (err) {
                    console.log(err)
                  }

                  setIsButtonDisabled(false)
                }}
              >
                <Row className="p-3">
                  <Col md="12">
                    <FormGroup>
                      <Label>Title</Label>
                      <Input
                        placeholder="Title"
                        type="text"
                        name="title"
                        value={inputs.title}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </Col>

                  <Col md="12">
                    <FormGroup>
                      <Label>Class Content</Label>
                      <Select
                        options={classContents}
                        value={form.classContentId}
                        onChange={(e) => {
                          setForm((prevState) => ({
                            ...prevState,
                            classContentId: {
                              value: e.value,
                              label: e.label,
                            },
                          }))
                        }}
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
                      Post
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

export default CreateClassForum
