import React, { useState, useEffect } from 'react'

import { useApolloClient } from 'react-apollo'
import { H3 } from 'views/Styled/index'

// reactstrap components
import { Card, CardHeader, CardBody, CardTitle, Table, Col, Spinner } from 'reactstrap'
// import CustomPagination from 'components/CustomPagination'
import { MY_COMMENTS_QUERY } from 'constants/forum'
import { NavLink, Link } from 'react-router-dom'

const MyComments = (props) => {
  const client = useApolloClient()
  const [myComments, setMyComments] = useState(null)
  const [page, setPage] = useState(1)

  useEffect(() => {
    async function myCommentsQuery() {
      try {
        const res = await client.query({
          query: MY_COMMENTS_QUERY,
        })
        return res.data.myComments
      } catch (e) {
        console.log(e)
      }
    }

    myCommentsQuery().then((comments) => {
      setMyComments(comments)
      console.log(comments)
    })
  }, [])

  if (!myComments) return <Spinner />

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <H3>Recent Comments</H3>
        </CardTitle>
      </CardHeader>
      <CardBody>
        <Table className="tablesorter">
          <thead className="text-primary">
            <tr>
              <th>Comment</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {myComments &&
              myComments.map((comment) => {
                return (
                  <tr key={comment.id}>
                    <td>
                      <Link className="font-weight-bold" 
                      to={`/class/${comment.commentable?.class.id}/forum/${comment.commentable?.id}`}>{comment.comment.length > 15 ? comment.comment.substr(0, 14) + '...' : comment.comment}</Link>
                    </td>
                    <td>{comment.created_at}</td>
                  </tr>
                )
              })}
            {/* <tr>
              <CustomPagination
                paginator={myComments.paginatorInfo}
                onPageChanged={setPage}
              />
            </tr> */}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  )
}

export default MyComments
