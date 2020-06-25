import React, { useState, useEffect } from 'react';

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
import { useApolloClient } from 'react-apollo';
import { MY_FORUMS_QUERY } from 'constants/forum';

const MyForums = (props) => {
  const client = useApolloClient()
  const [myForums, setMyForums] = useState(null)
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function myForumsQuery() {
      try {
        const res = await client.query({
          query: MY_FORUMS_QUERY,
          variables: {
            first: 5,
            page: page,
          },
        })
        return res.data.myForums
      } catch (e) {
        console.log(e)
      }
    }

    myForumsQuery().then((forums) => {
      setMyForums(forums)
      console.log(forums);
      
    })
  }, [page]);

  if(!myForums) return <Spinner />;

  return (
    <Col lg="6" md="12">
      <Card>
        <CardHeader>
          <CardTitle tag="h4">Recent Forums</CardTitle>
        </CardHeader>
        <CardBody>
          <Table className="tablesorter m-2">
            <thead className="text-primary">
              <tr>
                <th>Title</th>
                <th className="text-center">Comment Count</th>
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
                      <td className="text-center">{forum.comments_count}</td>
                    </tr>
                  )
                })}
              <tr>
                <CustomPagination paginator={myForums.paginatorInfo} onPageChanged={setPage} />
              </tr>
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </Col>
  );
}

export default MyForums;