import React, { useContext, useEffect } from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { H3 } from 'views/Styled/index'
import { CLASSES_QUERY } from 'constants/class'
import { AuthContext, useAuthContext } from 'contexts/auth'
import ClassTable from 'components/Table/Class'

// reactstrap components
import { Button, Card, CardHeader, CardBody, CardTitle, CardFooter, CardText, FormGroup, Form, Input, Table, Spinner, Row, Col } from 'reactstrap'

const ClassDashboard = (props) => {
  const authContext = useAuthContext()

  const { loading, error, data, fetchMore } = useQuery(CLASSES_QUERY, {
    variables: {
      id: authContext?.user?.id,
    },
  })

  if (loading) return <Spinner />
  if (error) return `Error! ${error}`

  const { classes } = data

  return (
    <>
      <div className="content">
        <ClassTable classes={classes} refetch={fetchMore} admin={authContext.user.roles.some((role) => role.name === 'admin')} />
      </div>
    </>
  )
}

export default ClassDashboard
