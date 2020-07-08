import React, { useState, useEffect } from 'react'
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks'
import { FormWrapper, H3 } from 'views/Styled/index'
import { USERS_QUERY } from 'constants/user'
import { CREATE_CLASS_ATTENDANCE_MUTATION } from 'constants/class'
import Error from 'views/shared/ErrorMessage'
import Success from 'views/shared/SuccessMessage'
import { selectable } from 'lib/util'
import useForm from 'lib/useForm'
import { GET_ENUM_QUERY } from 'views/Unauthenticated/Api'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'

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
import Select from 'react-select'

const ClassAttendanceCreate = (props) => {
  const [form, setForm] = useState({
    schedule_session_id: '',
    date: new Date(),
    student_attendances: [],
  })
  const { inputs, resetForm, handleChange } = useForm({
    schedule_session_id: '',
    date: null,
    student_attendances: [],
  })

  const ATTENDANCE_TYPE = useQuery(GET_ENUM_QUERY, {
    variables: { name: 'AttendanceType' },
  })

  const [success, setSuccess] = useState('')

  const USERS_QUERY_RES = useQuery(USERS_QUERY)

  let users = []
  let students = []

  if (USERS_QUERY_RES) {
    users = USERS_QUERY_RES?.data?.users

    students = users?.filter((user) =>
      user.roles.map((role) => role.name).includes('student')
    )

    if (students && students.length) students = selectable(students)
  }

  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const [createClassAttendance, { loading, error }] = useMutation(
    CREATE_CLASS_ATTENDANCE_MUTATION,
    {
      variables: {
        id: props.id,
        ...form,
      },
    }
  )

  if (loading) return <p>Loading...</p>

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <H3 className="title">Create Class Attendance</H3>
              </CardHeader>
              <Error error={error} />
              <Success success={success} />
              <CardBody>
                {form && ATTENDANCE_TYPE?.data && (
                  <Form
                    onSubmit={async (e) => {
                      e.preventDefault()
                      setIsButtonDisabled(true)
                      // setValidation(true)
                      try {
                        console.log({
                          ...inputs,
                          ...form,
                          date: moment(form.date).format('YYYY-MM-DD'),
                        })
                        const { data } = await createClassAttendance({
                          ...inputs,
                          ...form,
                          date: moment(form.date).format('YYYY-MM-DD'),
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
                          <Label>Schedule Session</Label>
                          <Input
                            placeholder="Schedule Session"
                            type="text"
                            name="schedule_session"
                            onChange={handleChange}
                            required
                          />
                        </FormGroup>
                      </Col>

                      <Col md="12">
                        <DatePicker
                          selected={form.date}
                          onChange={(e) => {
                            setForm((prevState) => ({
                              ...prevState,
                              date: e,
                            }))
                          }}
                        />
                      </Col>
                      <Col md="12">
                        <FormGroup>
                          <Label>Attendance</Label>
                          <Input type="select" name="select" required>
                            {ATTENDANCE_TYPE.data.__type.enumValues.map(
                              ({ name }) => (
                                <option key={name} value={name}>
                                  {name}
                                </option>
                              )
                            )}
                          </Input>
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
                        <Button
                          type="submit"
                          className="btn-fill"
                          color="primary"
                          disabled={isButtonDisabled}
                        >
                          Create Class Attendance
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

export default ClassAttendanceCreate
