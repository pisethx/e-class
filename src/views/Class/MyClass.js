import React, { useContext, useEffect, useState } from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { H3 } from '../Styled/index'
import { CLASS_QUERY } from '../../constants/class'
import { AuthContext } from '../../contexts/auth'
import ClassTable from '../../components/Table/Class'

const ClassDashboard = (props) => {
  const authContext = useContext(AuthContext)
  const [classes, setClasses] = useState([])

  useEffect(() => {
    const myClass = [
      ...authContext.user.learnings,
      ...authContext.user.teachings,
    ]
    return setClasses(() => myClass)
  }, [authContext.user])

  return <>{classes.length && <ClassTable classes={classes} />}</>
}

export default ClassDashboard
