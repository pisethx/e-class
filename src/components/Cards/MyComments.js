import React, { useState, useEffect } from 'react';

import { useApolloClient } from 'react-apollo';

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Col,
  Spinner,
} from 'reactstrap'
import CustomPagination from 'components/CustomPagination';
import { MY_COMMENTS_QUERY } from 'constants/forum';

const MyComments = props => {
  const client = useApolloClient()
  const [myComments, setMyComments] = useState(null)
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function myCommentsQuery() {
      try {
        const res = await client.query({
          query: MY_COMMENTS_QUERY,
          variables: {
            first: 5,
            page: page,
          },
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
  }, [page])

  if(!myComments) return <Spinner />;

  return (
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
              {props.myComments &&
                props.myComments.data.map((comment) => {
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
              <tr>
                <CustomPagination paginator={myComments.paginatorInfo} onPageChanged={setPage} />
              </tr>
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </Col>
  );
};

export default MyComments;