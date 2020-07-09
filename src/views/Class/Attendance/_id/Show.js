import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { H3 } from 'views/Styled/index'
import { CLASS_ATTENDANCE_QUERY } from 'constants/class'
import { NavLink } from 'react-router-dom'

// reactstrap components
import { Button, Card, CardHeader, CardBody, Row, Col, Form, FormGroup, Label, Input, CardFooter, CardTitle } from 'reactstrap'

const ClassAttendanceShow = (props) => {
  const { data } = useQuery(CLASS_ATTENDANCE_QUERY, {
    variables: {
      id: props.attendanceId,
    },
  })

  const attendance = data?.class?.class_attendances?.find((attendance) => attendance.id === props.attendanceId)
  console.log(attendance)
  return (
    <>
      {attendance && (
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader className="d-flex justify-content-between">
                  <H3 className="title">Attendance</H3>
                </CardHeader>
                <CardBody>
                  <H3>{`${attendance.date} (${attendance.schedule_session.start_time}-${attendance.schedule_session.end_time})`}</H3>
                  <div className="my-3">
                    {attendance.student_attendances.map((att) => (
                      <div key={att.id}>
                        <p style={{ fontWeight: 'bold' }}>{att.attendance_type}</p>
                        <p>{`${att.student.identity.first_name} ${att.student.identity.last_name}`}</p>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </>
  )
}

export default ClassAttendanceShow
