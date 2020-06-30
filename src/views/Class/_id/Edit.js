import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'
import useForm from '../../../lib/useForm'
import { FormWrapper, H3 } from '../../Styled/index'
import { USERS_QUERY } from '../../../constants/user'
import { CLASS_QUERY, UPDATE_CLASS_MUTATION } from '../../../constants/class'
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

const EditClass = (props) => {
  const [success, setSuccess] = useState('')

  let users = []
  let teachers = []
  let students = []
  let classCategories = []
  let [selectedStudents, setSelectedStudents] = useState([])

  const { data: usersRes } = useQuery(USERS_QUERY, {
    variables: {
      first: 30,
      page: 1,
    },
  })

  const { data: classRes } = useQuery(CLASS_QUERY, {
    variables: {
      id: props.id,
    },
  })

  // query class categories

  if (usersRes) {
    users = usersRes.users.data
    students = users.filter((user) =>
      user.roles.map((role) => role.name).includes('student')
    )
    teachers = users.filter((user) =>
      user.roles.map((role) => role.name).includes('teacher')
    )
  }
  let eachClass = null
  let initialForm = null
  if (classRes) {
    eachClass = classRes.class
    selectedStudents = eachClass.students.map((student) => student.id)
    // initialForm = {
    //   name: eachClass?.name,
    //   code: eachClass?.code,
    //   teacher: eachClass?.teacher?.id,
    //   students: selectedStudents,
    //   class_categories,
    // }
  }

  const { inputs, handleChange, resetForm } = useForm({
    name: '',
    code: '',
    teacher: '',
    students: [],
    class_categories: [],
  })

  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const [updateClass, { error, loading }] = useMutation(UPDATE_CLASS_MUTATION, {
    variables: inputs,
  })

  if (loading) return <p>Loading...</p>
  if (error) return `Error! ${error}`

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
                {usersRes && classRes && (
                  <Form
                    onSubmit={async (e) => {
                      e.preventDefault()
                      setIsButtonDisabled(true)
                      // setValidation(true)
                      try {
                        inputs.students = selectedStudents
                        await updateClass(inputs)
                        setSuccess('Success')
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
                          <Label>Code</Label>
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
                          <Label>Teacher</Label>
                          <Input
                            type="select"
                            placeholder="Teacher"
                            name="teacher"
                            value={inputs.teacher}
                            onChange={handleChange}
                            required
                          >
                            <option value="" defaultValue>
                              - Select a Teacher -
                            </option>
                            {teachers.map((user) => (
                              <option
                                key={user.id}
                                value={user.id}
                              >{`${user.identity.first_name} ${user.identity.last_name}`}</option>
                            ))}
                          </Input>
                        </FormGroup>
                      </Col>

                      <Col md="12">
                        <FormGroup>
                          <Label>Students</Label>
                          <Input
                            type="select"
                            name="students"
                            value={selectedStudents}
                            onChange={(e) => {
                              let opts = [],
                                opt
                              for (
                                let i = 0, len = e.target.options.length;
                                i < len;
                                i++
                              ) {
                                opt = e.target.options[i]
                                if (opt.selected) {
                                  opts.push(+opt.value)
                                }
                              }

                              setSelectedStudents(opts)
                            }}
                            multiple
                          >
                            {students.map((user) => (
                              <option
                                key={user.id}
                                value={user.id}
                              >{`${user.identity.first_name} ${user.identity.last_name}`}</option>
                            ))}
                          </Input>
                        </FormGroup>
                      </Col>

                      <Col md="12">
                        <FormGroup>
                          <Label>Class Categories</Label>
                          <Input
                            type="select"
                            name="class_categories"
                            value={inputs.class_categories}
                            multiple
                          >
                            {students.map((user) => (
                              <option
                                key={user.id}
                                value={user.id}
                              >{`${user.identity.first_name} ${user.identity.last_name}`}</option>
                            ))}
                          </Input>
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
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default EditClass
