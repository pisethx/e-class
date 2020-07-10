import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { H3 } from 'views/Styled/index'
import { CLASS_CATEGORIES_QUERY } from 'constants/class'
import { NavLink } from 'react-router-dom'

// reactstrap components
import { Button, Card, CardHeader, CardBody, Row, Col } from 'reactstrap'
import PostCard from 'components/Cards/Post'
import role from 'constants/data'
import moment from 'moment'

const ForumTable = (props) => {
  const { loading, error, data } = useQuery(CLASS_CATEGORIES_QUERY, {
    variables: {
      id: props.id,
    },
  })

  const exams = data?.class?.class_categories.find((category) => category.id === props.categoryId)?.exams
  console.log(exams)

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader className="d-flex justify-content-between">
                <H3 className="title">Exam</H3>

                {role?.name === 'teacher' && (
                  <NavLink to={`exam/create`}>
                    <Button className="animation-on-hover" color="primary">
                      Create Exam
                    </Button>
                  </NavLink>
                )}
              </CardHeader>
              <CardBody style={{ padding: '1rem 2rem' }}>
                {exams?.map(({ id, name, attempts, description, due_at, publishes_at, questions }) => (
                  <PostCard
                    key={id}
                    title={name}
                    info={`Attempts: ${attempts}`}
                    date={`Due Date: ${due_at ? moment(due_at).format('YYYY-MM-DD') : 'Not Specified'}`}
                    description={description}
                    showBtn={{
                      name: `Take Exam`,
                      path: `exam/${id}`,
                    }}
                    editBtn={
                      role?.name === 'teacher'
                        ? {
                            name: `Grade Exam`,
                            path: `exam/${id}/grade`,
                          }
                        : undefined
                    }
                  />
                ))}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default ForumTable
