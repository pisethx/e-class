import React, { useState, useContext, useEffect, useRef } from 'react'
// nodejs library that concatenates classes
import classNames from 'classnames'
// react plugin used to create charts
import { NavLink } from 'react-router-dom'
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

import { AuthContext, useAuthContext } from 'contexts/auth'
import { useApolloClient, useQuery } from 'react-apollo'
import { MY_FORUMS_QUERY } from 'constants/forum'
import { MY_COMMENTS_QUERY } from 'constants/forum'
import { CLASS_QUERY } from 'constants/class'
import MyForums from 'components/Cards/MyForums'
import MyComments from 'components/Cards/MyComments'
import ClassTable from 'components/Table/Class'

const Dashboard = (props) => {
  const authContext = useAuthContext()
  const client = useApolloClient()

  const [classes, setClasses] = useState([])

  useEffect(() => {
    const myClass = [...authContext.user.learnings, ...authContext.user.teachings]
    return setClasses(() => myClass)
  }, [authContext.user])

  return (
    <>
      <div className="content">
        {classes.length ? <ClassTable classes={classes} title="My Class" /> : ''}
        <Row>
          <Col md="6">
            <MyForums />
          </Col>
          <Col md="6">
            <MyComments />
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Dashboard
