import React, { useContext, useEffect } from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { H3 } from 'views/Styled/index'
import { CLASSES_QUERY } from 'constants/class'
import { AuthContext, useAuthContext } from 'contexts/auth'
import ClassTable from 'components/Table/Class'

// reactstrap components
import { Button, Card, CardHeader, CardBody, CardTitle, CardFooter, CardText, FormGroup, Form, Input, Table, Spinner, Row, Col } from 'reactstrap'
import Loading from 'components/Loading'

const ClassDashboard = (props) => {
  const authContext = useAuthContext()

  const { loading, error, data, fetchMore } = useQuery(CLASSES_QUERY, {
    variables: {
      id: authContext?.user?.id,
    },
  })

  if (loading) return <Loading />
  if (error) return `Error! ${error}`

  const { classes } = data

  return (
    <>
      <div className="content">
        <ClassTable classes={classes} admin={authContext.user.roles.some((role) => role.name === 'admin')} />
      </div>
    </>

    // <div className="content">
    //   <Row>
    //     <Col md="12">
    //       <Card>
    //         <CardHeader>
    //           <H3 className="title">Classes</H3>
    //         </CardHeader>
    //         <CardBody>
    //           <Table className="tablesorter">
    //             <thead className="text-primary">
    //               <tr>
    //                 <th>ID</th>
    //                 <th>Code</th>
    //                 <th>Name</th>
    //                 <th>Teacher</th>
    //                 <th>Actions</th>
    //               </tr>
    //             </thead>
    //             <tbody>
    //               {classes?.map((each) => (
    //                 <tr key={each.id}>
    //                   <td>{each.id}</td>
    //                   <td>{each.code}</td>
    //                   <td>{each.name}</td>
    //                   <td>{`${each.teacher?.identity?.first_name} ${each.teacher?.identity?.last_name}`}</td>
    //                   <td>
    //                     <Button size="sm" className="mr-3 my-1" color="info">
    //                       Show
    //                     </Button>
    //                     <Button size="sm" className="mr-3 my-1" color="success">
    //                       Edit
    //                     </Button>
    //                     <Button size="sm" className="mr-3 my-1" color="danger">
    //                       Delete
    //                     </Button>
    //                   </td>
    //                 </tr>
    //               ))}
    //             </tbody>
    //           </Table>
    //         </CardBody>
    //       </Card>
    //     </Col>
    //   </Row>
    // </div>
  )
}

export default ClassDashboard
