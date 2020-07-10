import React, { useState, useEffect } from 'react'
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'
import useForm from 'lib/useForm'
import { FormWrapper, H3 } from 'views/Styled/index'
import { USERS_QUERY } from 'constants/user'
import { CLASS_QUERY, UPDATE_CLASS_MUTATION } from 'constants/class'
import Error from 'views/shared/ErrorMessage'
import Success from 'views/shared/SuccessMessage'
import { selectable } from 'lib/util'
import { GET_ENUM_QUERY } from 'views/Unauthenticated/Api'

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
  Spinner,
} from 'reactstrap'
import Select from 'react-select'

const EditClass = (props) => {
  const client = useApolloClient()

  const [form, setForm] = useState({})

  const [success, setSuccess] = useState('')

  const CLASS_QUERY_RES = useQuery(CLASS_QUERY, {
    variables: {
      id: props.id,
    },
  })
  const USERS_QUERY_RES = useQuery(USERS_QUERY)

  let users = []
  let teachers = []
  let students = []

  if (USERS_QUERY_RES) {
    users = USERS_QUERY_RES?.data?.users

    students = users?.filter((user) => user.roles.map((role) => role.name).includes('student'))

    teachers = users?.filter(
      (user) => user.roles.map((role) => role.name).includes('teacher') || user.roles.map((role) => role.name).includes('admin')
    )
    if (students && students.length) students = selectable(students)
    if (teachers && teachers.length) teachers = selectable(teachers)
  }

  useEffect(() => {
    async function queryClass() {
      try {
        const eachClass = await client.query({
          query: CLASS_QUERY,
          variables: {
            id: props.id,
          },
        })

        const { name, code, students, teacher } = eachClass?.data?.class

        setForm({
          name,
          code,
          teacher: {
            value: teacher.id,
            label: `${teacher.identity.first_name} ${teacher.identity.last_name}`,
          },
          students: students?.map((student) => ({
            value: student.id,
            label: `${student.identity.first_name} ${student.identity.last_name}`,
          })),
        })
      } catch (e) {
        throw new Error(e)
      }
    }
    queryClass()
  }, [])

  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const [updateClass, { loading, error }] = useMutation(UPDATE_CLASS_MUTATION, {
    variables: {
      id: props.id,
      ...form,
    },
  })

  if (loading) return <Spinner />

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
                        const { data } = await updateClass({
                          ...form,
                          teacher: form.teacher.value,
                          students: form.students.map((student) => student.value),
                        })
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
                        {/* <Field name="name"></Field> */}
                        <FormGroup>
                          <Label>Name</Label>
                          <Input
                            placeholder="name"
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={(e) => {
                              setForm((prevState) => ({
                                ...prevState,
                                name: e.value,
                              }))
                            }}
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
                            value={form.code}
                            onChange={(e) => {
                              setForm((prevState) => ({
                                ...prevState,
                                code: e.value,
                              }))
                            }}
                            required
                          />
                        </FormGroup>
                      </Col>

                      <Col md="12">
                        <FormGroup>
                          <Label>Teacher</Label>
                          <Select
                            options={teachers}
                            value={form.teacher}
                            onChange={(e) => {
                              setForm((prevState) => ({
                                ...prevState,
                                teacher: {
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
                          <Label>Students</Label>
                          <Select
                            options={students}
                            isMulti={true}
                            value={form.students}
                            closeMenuOnSelect={false}
                            onChange={(e) => {
                              setForm((prevState) => ({
                                ...prevState,
                                students: e,
                              }))
                            }}
                          />
                        </FormGroup>
                      </Col>

                      <Col md="12" className="mt-1">
                        <Button type="submit" className="btn-fill" color="primary" disabled={isButtonDisabled}>
                          Update Class
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
