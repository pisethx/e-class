import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import useForm from 'lib/useForm'
import { CREATE_CLASS_CONTENT_MUTATION } from 'constants/class'
import Error from 'views/shared/ErrorMessage'
import Success from 'views/shared/SuccessMessage'
import { Editor } from '@tinymce/tinymce-react'

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
  FormText,
  Form,
  Input,
  Label,
  Row,
  Col,
} from 'reactstrap'
import { H3 } from 'views/Styled'

const EditClassContent = (props) => {
  const [success, setSuccess] = useState('')
  const { inputs, handleChange, resetForm } = useForm({
    name: '',
    description: '',
    file: null,
  })

  const [file, setFile] = useState(null)

  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const [uploadedFile, setUploadedFile] = useState(false)

  const [createClassContent, { error, loading }] = useMutation(CREATE_CLASS_CONTENT_MUTATION, {
    variables: {
      ...inputs,
      classId: props.id,
      file: file,
    },
  })

  if (loading) return <p>Loading...</p>
  // if (error) return `Error! ${error}`

  const uploadFile = ({
    target: {
      validity,
      files: [file],
    },
  }) => {
    setFile(file)
    setUploadedFile(true)
  }

  return (
    <>
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
                      props.history.push(`/class/${props.id}/content`)
                    } catch (err) {
                      setUploadedFile(false)
                    }

                    setIsButtonDisabled(false)

                    // props.history.goBack()
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
                      {/* <FormGroup>
                        <Label>Description</Label>
                        <Input placeholder="Description" type="text" name="description" value={inputs.description} onChange={handleChange} required />
                      </FormGroup> */}
                      <Editor
                        initialValue={inputs.description}
                        init={{
                          height: 500,
                          menubar: false,
                          plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount',
                          ],
                          toolbar: `undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help`,
                        }}
                        onEditorChange={(val) => {
                          inputs.description = val
                        }}
                      />
                    </Col>

                    <Col md="12">
                      <FormGroup>
                        {/* <Label>File</Label> */}
                        <Input placeholder="File" type="file" name="file" onChange={uploadFile} required />

                        <Button className="btn-simple" color={uploadedFile ? 'success' : 'warning'}>
                          Upload File{uploadedFile ? ' Successfully' : ''}
                        </Button>
                      </FormGroup>
                    </Col>

                    <Col md="12" className="mt-1">
                      <Button type="submit" className="btn-fill" color="primary" disabled={isButtonDisabled}>
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
    </>
  )
}

export default CreateClassContent
