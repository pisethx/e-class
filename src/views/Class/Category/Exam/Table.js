import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { H3 } from 'views/Styled/index'
import { CLASS_CATEGORIES_QUERY } from 'constants/class'
import { NavLink } from 'react-router-dom'

// reactstrap components
import { Button, Card, CardHeader, CardBody, Row, Col } from 'reactstrap'
import role from 'constants/data'
import moment from 'moment'
import { MY_EXAMS_IN_CLASS_QUERY, DELETE_EXAM_MUTATION } from 'constants/exam'

import ExamPostCard from 'components/Cards/ExamPostCard'

const ForumTable = (props) => {
  const { _loading, _error, data: _myExamsInClass } = useQuery(MY_EXAMS_IN_CLASS_QUERY, {
    variables: {
      class_id: props.match.params.id,
    },
  })
  const { loading, error, data, refetch } = useQuery(CLASS_CATEGORIES_QUERY, {
    variables: {
      id: props.id,
    },
  })

  const exams = data?.class?.class_categories.find((category) => category.id === props.categoryId)?.exams
  const myExamsInClass = _myExamsInClass?.myExamsInClass
  console.log(exams, myExamsInClass)

  const checkAttemptsForStudent = (myExamsInClass, id, attempts) => {
    const found = myExamsInClass?.find((myExam) => myExam.exam.id === id)
    if (!found) return true

    return found.attempts < attempts
  }

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
                  <ExamPostCard
                    key={id}
                    title={name}
                    info={`Attempts: ${attempts}, Publishes at: (${publishes_at ? moment(publishes_at).format('YYYY-MM-DD') : 'Not Specified'})`}
                    date={`Due Date: ${due_at ? moment(due_at).format('YYYY-MM-DD') : 'Not Specified'}`}
                    attempts={attempts}
                    due_at={due_at}
                    publishes_at={publishes_at}
                    description={description}
                    id={id}
                    deleteMutation={DELETE_EXAM_MUTATION}
                    refetch={refetch}
                    showBtn={
                      role?.name === 'student' && checkAttemptsForStudent(myExamsInClass, id, attempts) && moment(due_at).isAfter()
                        ? {
                            name: `Take Exam`,
                            path: `exam/${id}`,
                          }
                        : undefined
                    }
                    editBtn={
                      role?.name === 'teacher'
                        ? {
                            name: `Grade Exam`,
                            path: `exam/${id}/grade`,
                          }
                        : undefined
                    }
                    deleteBtn={role?.name === 'teacher'}
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
