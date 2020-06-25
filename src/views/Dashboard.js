import React, { useState, useContext, useEffect, useRef } from 'react'
// nodejs library that concatenates classes
import classNames from 'classnames'
// react plugin used to create charts
import { Line, Bar } from 'react-chartjs-2'

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
} from 'reactstrap'

import { AuthContext } from 'contexts/auth'
import { useApolloClient, useQuery } from 'react-apollo'
import { MY_FORUMS_QUERY } from 'constants/forum'
import { MY_COMMENTS_QUERY } from 'constants/forum'
import { CLASSES_QUERY } from 'constants/class'

const Dashboard = (props) => {
  const authContext = useContext(AuthContext)
  const client = useApolloClient()
  const [myForums, setMyForums] = useState(null)
  const [myComments, setMyComments] = useState(null)
  const [classes, setClasses] = useState(null)

  useEffect(() => {
    async function myForumsQuery() {
      try {
        const res = await client.query({
          query: MY_FORUMS_QUERY,
          variables: {
            first: 10,
            page: 1,
          },
        })
        return res.data.myForums
      } catch (e) {
        console.log(e)
      }
    }

    async function myCommentsQuery() {
      try {
        const res = await client.query({
          query: MY_COMMENTS_QUERY,
          variables: {
            first: 10,
            page: 1,
          },
        })
        return res.data.myComments
      } catch (e) {
        console.log(e)
      }
    }

    async function getClasses() {
      try {
        const res = await client.query({
          query: CLASSES_QUERY,
          variables: {
            first: 10,
            page: 1
          }
        })

        return res.data.classes
      }catch (e) {
        console.log(e)
      }
    }

    myForumsQuery().then((forums) => {
      setMyForums(forums)
    })

    myCommentsQuery().then((comments) => {
      setMyComments(comments)
      console.log(comments)
    })

    if(authContext.users.roles[0].name === 'teacher') {
      setClasses(authContext.users.teachings);
    } else if(authContext.users.roles[0].name === 'student') {
      setClasses(authContext.users.learnings);
    }
  }, [])

  const renderClasses = (classes) => {
    const zeroPad = (num, places) => String(num).padStart(places, '0')
    if(!classes) return <Spinner />
    
    return classes.map((class_) => {
      return (
        <tr key={class_.id}>
          <td>
            <a href="#">{class_.name}</a>
          </td>
          <td>{class_.code}</td>
          <td>
            {class_.schedules.map((schedule) => {
              return (
                <Row>
                  {console.log(schedule)}
                  <Col lg="6" md="12" className="text-strong">
                    {schedule.day}
                  </Col>
                  <Col lg="6" md="12">
                    {schedule.sessions &&
                      schedule.sessions.map((session) => {
                        return (
                          <tr>
                            <td>{
                                zeroPad(session.start_time, 4).slice(0, 2) + ':' + zeroPad(session.start_time, 4).slice(2)
                              }</td>
                            <td>-</td>
                            <td>{zeroPad(session.end_time, 4).slice(0, 2) + ':' + zeroPad(session.end_time, 4).slice(2)}</td>
                          </tr>
                        )
                      })}
                  </Col>
                </Row>
              )
            })}
          </td>
        </tr>
      )
    });
  }

  const ele = {
    classes: (
      <Col>
        <Card>
          <CardHeader>
            <CardTitle tag="h3">Classes</CardTitle>
          </CardHeader>
          <CardBody>
            <Table className="tablesorter">
              <thead className="text-primary">
                <tr>
                  <th>Name</th>
                  <th>Code</th>
                  <th>Schedule</th>
                </tr>
              </thead>
              <tbody>
                {/* {authContext.user.learnings &&
                  renderClasses(authContext.user.learnings)}
                {authContext.user.teachings &&
                renderClasses(authContext.user.teachings)} */}
                {renderClasses(classes)}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
    ),
    myForums: (
      <Col lg="6" md="12">
        <Card>
          <CardHeader>
            <CardTitle tag="h4">Recent Forums</CardTitle>
          </CardHeader>
          <CardBody>
            <Table className="tablesorter">
              <thead className="text-primary">
                <tr>
                  <th>Title</th>
                  <th>Comment Count</th>
                </tr>
              </thead>
              <tbody>
                {myForums &&
                  myForums.data.map((forum) => {
                    return (
                      <tr>
                        <td>
                          <a href="#">{forum.title}</a>
                        </td>
                        <td>{forum.comments_count}</td>
                      </tr>
                    )
                  })}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
    ),
    myComments: (
      <Col lg="6" md="12">
        <Card>
          <CardHeader>
            <CardTitle tag="h4">Recent Comments</CardTitle>
          </CardHeader>
          <CardBody>
            <Table className="tablesorter">
              <thead className="text-primary">
                <tr>
                  <th>Comment</th>
                  <th>Forum</th>
                </tr>
              </thead>
              <tbody>
                {myComments &&
                  myComments.data.map((comment) => {
                    return (
                      <tr>
                        <td>
                          <a href="#">{comment.comment}</a>
                        </td>
                        <td>
                          <a href="#">{comment.commentable.title}</a>
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
    ),
  }

  return (
    <>
      <div className="content">
        <Row>{ele.classes}</Row>
        <Row>
          {ele.myForums} {ele.myComments}
        </Row>
      </div>
    </>
  )
}

export default Dashboard
