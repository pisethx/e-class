import React, { useState, useContext, useEffect, useRef } from 'react'
// nodejs library that concatenates classes
import classNames from 'classnames'
// react plugin used to create charts
import { Line, Bar } from 'react-chartjs-2'
import { H3 } from './Styled/index'
import { Redirect } from 'react-router-dom'

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
  Spinner,
  Pagination,
} from 'reactstrap'

import { AuthContext } from 'contexts/auth'
import { useApolloClient, useQuery } from 'react-apollo'
import { MY_FORUMS_QUERY } from 'constants/forum'
import { MY_COMMENTS_QUERY } from 'constants/forum'
import { CLASS_QUERY } from 'constants/class'
import MyForums from '../components/Cards/MyForums'
import MyComments from 'components/Cards/MyComments'

const Dashboard = (props) => {
  const authContext = useContext(AuthContext)
  const client = useApolloClient()

  useEffect(() => {
    async function getClasses() {
      try {
        const res = await client.query({
          query: CLASS_QUERY,
          variables: {
            first: 10,
            page: 1,
          },
        })

        return res.data.classes
      } catch (e) {
        console.log(e)
      }
    }
  }, [])

  const renderClasses = (classes) => {
    if (!classes) return <Spinner />

    return classes.map((class_) => {
      return (
        <tr key={class_.id}>
          <td>
            <a style={{ fontWeight: 'bold' }} href={`class/${class_.id}`}>
              {class_.name}
            </a>
          </td>
          <td>{class_.code}</td>
          <td width="min-content">
            <Table striped responsive>
              {class_.schedules.map((schedule) => {
                return (
                  <Row className="p-2">
                    <Col lg="6" md="12" className="text-left">
                      {schedule.day}
                    </Col>
                    <Col lg="6" md="12">
                      {schedule.sessions &&
                        schedule.sessions.map((session) => {
                          return (
                            <tr key={session.id}>
                              <td>{session.start_time}</td>
                              <td>-</td>
                              <td>{session.end_time}</td>
                            </tr>
                          )
                        })}
                    </Col>
                  </Row>
                )
              })}
            </Table>
          </td>
        </tr>
      )
    })
  }

  const ele = {
    classes: (
      <Col>
        <Card>
          <CardHeader>
            <CardTitle>
              <H3>Classes</H3>
            </CardTitle>
          </CardHeader>
          <CardBody>
            <Table className="tablesorter">
              <thead className="text-primary">
                <tr>
                  <th>Name</th>
                  <th>Code</th>
                  <th className="text-center">Schedule</th>
                </tr>
              </thead>
              <tbody>
                {authContext.user.learnings &&
                  renderClasses(authContext.user.learnings)}
                {authContext.user.teachings &&
                  renderClasses(authContext.user.teachings)}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
    ),
  }

  return (
    <div className="content">
      <Row>
        <MyForums />
        <MyComments />
      </Row>
      <Row>{ele.classes}</Row>
    </div>
  )
}

export default Dashboard
