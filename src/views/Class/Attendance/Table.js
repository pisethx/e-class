import React, { useContext } from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { H3 } from 'views/Styled/index'
import { ATTENDANCE_IN_CLASS_QUERY } from 'constants/class'
import { NavLink } from 'react-router-dom'

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Table,
  Row,
  Col,
  Nav,
  Spinner,
} from 'reactstrap'
import role from 'constants/data'
import { AuthContext } from 'contexts/auth'
import Delete from 'components/Forms/Delete'
import { DELETE_CLASS_ATTENDANCE_MUTATION } from 'constants/class'

const ClassAttendanceTable = (props) => {
  const authContext = useContext(AuthContext)
  let totalAbsences = 0
  let totalPresents = 0
  let totalPermissions = 0
  const { loading, error, data, refetch } = useQuery(ATTENDANCE_IN_CLASS_QUERY, {
    variables: {
      id: props.id,
    },
  })

  const cntTotalAndOutputType = (student_attendances) => {
    const found = student_attendances.find((sa) => sa.student.id === authContext.user.id)
    let rtn = ''
    if (found) {
      // eslint-disable-next-line default-case
      switch (found.attendance_type) {
        case 'ABSENCE':
          totalAbsences++
          break
        case 'PRESENT':
          totalPresents++
          break
        case 'PERMISSION':
          totalPermissions++
          break
      }
      rtn = found.attendance_type
    }

    return rtn
  }

  if (loading) return <Spinner />

  const attendances = data?.class?.class_attendances

  return (
    <>
      {attendances && (
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader className="d-flex justify-content-between">
                  <H3 className="title">Class Attendances</H3>

                  {role.name === 'teacher' && (
                    <NavLink to={`/class/${props.id}/attendance/create`}>
                      <Button className="animation-on-hover" color="primary">
                        Create Attendance
                      </Button>
                    </NavLink>
                  )}
                </CardHeader>
                <CardBody style={{ padding: '1rem 2rem' }}>
                  {attendances &&
                    attendances?.map(({ id, date, schedule_session, student_attendances }) => (
                      <Card
                        key={id}
                        className="m-0"
                        style={{
                          border: '1px solid #444',
                        }}
                      >
                        <CardHeader className="px-4 py-2">
                          <Row>
                            {role.name === 'teacher' ? (
                              <>
                                <Col xs="9">
                                  <NavLink to={`attendance/${id}`} style={{ fontWeight: 'bold' }}>
                                    <Row>
                                      {schedule_session.schedule.day}({`${schedule_session.start_time} - ${schedule_session.end_time}`})
                                    </Row>
                                    <Row>
                                      <small>{date}</small>
                                    </Row>
                                  </NavLink>
                                </Col>
                                <Col xs="3">
                                  <Delete
                                    id={id}
                                    name={`attendance on ${date} ${schedule_session.schedule.day}(${schedule_session.start_time} - ${schedule_session.end_time})`}
                                    deleteMutation={DELETE_CLASS_ATTENDANCE_MUTATION}
                                    refetch={refetch}
                                  />
                                </Col>
                              </>
                            ) : (
                              <>
                                <Col xs="6">
                                  <Row>
                                    {schedule_session.schedule.day}({`${schedule_session.start_time} - ${schedule_session.end_time}`})
                                  </Row>
                                  <Row>
                                    <small>{date}</small>
                                  </Row>
                                </Col>
                                <Col xs="6">{cntTotalAndOutputType(student_attendances)}</Col>
                              </>
                            )}
                          </Row>
                        </CardHeader>
                      </Card>
                    ))}
                  {role.name === 'student' && (
                    <>
                      <Card
                        key="totalPresents"
                        className="m-0 mt-3"
                        style={{
                          border: '1px solid #444',
                        }}
                      >
                        <CardHeader className="px-4 py-2">
                          <Row>
                            <Col xs="6" className="font-weight-bold">
                              Total Presents :
                            </Col>
                            <Col xs="6" className="font-weight-bold">
                              {totalPresents}
                            </Col>
                          </Row>
                        </CardHeader>
                      </Card>
                      <Card
                        key="totalAbsences"
                        className="m-0"
                        style={{
                          border: '1px solid #444',
                        }}
                      >
                        <CardHeader className="px-4 py-2">
                          <Row>
                            <Col xs="6" className="font-weight-bold">
                              Total Absences :
                            </Col>
                            <Col xs="6" className="font-weight-bold">
                              {totalAbsences}
                            </Col>
                          </Row>
                        </CardHeader>
                      </Card>
                      <Card
                        key="totalPermissions"
                        className="m-0"
                        style={{
                          border: '1px solid #444',
                        }}
                      >
                        <CardHeader className="px-4 py-2">
                          <Row>
                            <Col xs="6" className="font-weight-bold">
                              Total Permissions :
                            </Col>
                            <Col xs="6" className="font-weight-bold">
                              {totalPermissions}
                            </Col>
                          </Row>
                        </CardHeader>
                      </Card>
                    </>
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

export default ClassAttendanceTable
