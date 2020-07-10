import React from 'react'
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

const ClassAttendanceTable = (props) => {
  const { loading, error, data } = useQuery(ATTENDANCE_IN_CLASS_QUERY, {
    variables: {
      id: props.id,
    },
  })

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

                  <NavLink to={`/class/${props.id}/attendance/create`}>
                    <Button className="animation-on-hover" color="primary">
                      Create Attendance
                    </Button>
                  </NavLink>
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
                              <NavLink to={`attendance/${id}`} style={{ fontWeight: 'bold' }}>
                                {date} ({`${schedule_session.start_time} - ${schedule_session.end_time}`})
                              </NavLink>
                            ) : (
                              <>
                                <Col xs="6">
                                {date} ({`${schedule_session.start_time} - ${schedule_session.end_time}`})
                                </Col>
                                <Col xs="6">
                                  123
                                </Col>
                              </>
                            )}
                          </Row>
                        </CardHeader>
                      </Card>
                    ))}
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
