import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { H3 } from 'views/Styled/index'
import { CLASS_ATTENDANCE_QUERY } from 'constants/class'
import { NavLink } from 'react-router-dom'
import ClassAttendanceCreate from '../Create'

// reactstrap components
import { Button, Card, CardHeader, CardBody, Row, Col, Form, FormGroup, Label, Input, CardFooter, CardTitle } from 'reactstrap'

const ClassAttendanceShow = (props) => {
  const { data } = useQuery(CLASS_ATTENDANCE_QUERY, {
    variables: {
      id: props.attendanceId,
    },
  })

  let attendance = data?.classAttendance
  console.log(attendance)
  return <>{attendance && <ClassAttendanceCreate {...props} attendance={{ ...attendance, id: props.attendanceId }} />}</>
}

export default ClassAttendanceShow
