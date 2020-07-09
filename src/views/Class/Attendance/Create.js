import React, { useState, useEffect } from 'react'
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks'
import { FormWrapper, H3 } from 'views/Styled/index'
import { USERS_QUERY } from 'constants/user'
import { CREATE_CLASS_ATTENDANCE_MUTATION, CLASS_QUERY } from 'constants/class'
import Error from 'views/shared/ErrorMessage'
import Success from 'views/shared/SuccessMessage'
import { selectable } from 'lib/util'
import useForm from 'lib/useForm'
import { GET_ENUM_QUERY } from 'views/Unauthenticated/Api'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'

// reactstrap components
import { Alert, Button, Card, CardHeader, CardBody, CardFooter, CardText, FormGroup, FormFeedback, Form, Input, Label, Row, Col } from 'reactstrap'
import Select from 'react-select'

const ClassAttendanceCreate = (props) => {
  const [form, setForm] = useState({
    schedule_session_id: '',
    date: null,
    student_attendances: [],
  })

  let [classData, setClassData] = useState({
    students: [],
    schedules: [],
  })

  const ATTENDANCE_TYPE = useQuery(GET_ENUM_QUERY, {
    variables: { name: 'AttendanceType' },
  })

  const { data } = useQuery(CLASS_QUERY, {
    variables: {
      id: props.id,
    },
  })

  const [success, setSuccess] = useState('')

  useEffect(() => {
    const eachClass = data?.class

    if (eachClass?.students && eachClass.schedules) {
      setClassData({
        students: eachClass?.students?.map(({ id, identity }) => ({
          value: id,
          label: `${identity.first_name} ${identity.last_name}`,
        })),
        schedules: eachClass?.schedules
          ?.map(({ sessions, day }) =>
            sessions.map(({ id, start_time, end_time }) => ({
              value: id,
              label: `${day} (${start_time}-${end_time})`,
            }))
          )
          .flat(),
      })

      setForm((prevState) => ({
        ...prevState,
        student_attendances: eachClass?.students?.map(({ id }) => ({
          student_id: id,
          attendance_type: ATTENDANCE_TYPE?.data?.__type?.enumValues[0]?.name,
        })),
      }))
    }
  }, [data, ATTENDANCE_TYPE])

  const [isButtonDisabled, setIsButtonDisabled] = useState(false)

  const [createClassAttendance, { loading, error }] = useMutation(CREATE_CLASS_ATTENDANCE_MUTATION, {
    variables: {
      id: props.id,
      ...form,
      date: moment(form.date).format('YYYY-MM-DD'),
    },
  })

  const { schedules, students } = classData
  if (loading) return <p>Loading...</p>

  return (
    <>
      {students.length && schedules.length && form.student_attendances.length && (
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
                          await createClassAttendance()
                          setSuccess('Success')
                        } catch (err) {
                          console.log(err)
                        }

                        setIsButtonDisabled(false)
                      }}
                    >
                      <Row className="p-3">
                        <Col md="12">
                          <FormGroup>
                            <Label>Schedule Session</Label>{' '}
                            <Select
                              options={schedules}
                              onChange={(e) => {
                                setForm((prevState) => ({
                                  ...prevState,
                                  schedule_session_id: e.value,
                                }))
                              }}
                            />
                          </FormGroup>
                        </Col>
                        <Col md="12">
                          <Label>Date</Label>
                          <DatePicker
                            selected={form.date}
                            onChange={(date) => {
                              setForm((prevState) => ({
                                ...prevState,
                                date,
                              }))
                            }}
                          />
                        </Col>

                        {form?.student_attendances?.map(({ student_id, attendance_type }, i) => (
                          <Col md="12" key={i}>
                            <p className="mb-0 mt-4" style={{ fontWeight: 'bold' }}>
                              {students.find((s) => s.value === student_id)?.label}
                            </p>
                            {ATTENDANCE_TYPE.data.__type.enumValues.map(({ name }, j) => (
                              <FormGroup check inline className="form-check-radio" key={j}>
                                <Label className="form-check-label">
                                  <Input
                                    type="radio"
                                    value={name}
                                    checked={attendance_type === name}
                                    name={'checkbox' + i}
                                    onChange={(e) => {
                                      let updatedStudentAttendance = form.student_attendances
                                      updatedStudentAttendance[i].attendance_type = e.target.value
                                      setForm((prevState) => ({
                                        ...prevState,
                                        student_attendances: updatedStudentAttendance,
                                      }))
                                    }}
                                  />
                                  {name}
                                  <span className="form-check-sign"></span>
                                </Label>
                              </FormGroup>
                            ))}
                          </Col>
                        ))}

                        <Col md="12" className="mt-4">
                          <Button type="submit" className="btn-fill" color="primary" disabled={isButtonDisabled}>
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
      )}
    </>
  )
}

export default ClassAttendanceCreate
