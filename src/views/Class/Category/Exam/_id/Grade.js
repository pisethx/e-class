import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { H3 } from 'views/Styled/index'
import { CLASS_CATEGORIES_QUERY } from 'constants/class'
import { GRADE_STUDENT_EXAM_MUTATION } from 'constants/grade'
import { NavLink } from 'react-router-dom'
import Error from 'views/shared/ErrorMessage'
import Success from 'views/shared/SuccessMessage'
import moment from 'moment'
// reactstrap components
import { Button, Card, CardHeader, CardBody, Row, Col, Form, FormGroup, Label, Input, CardFooter, Spinner } from 'reactstrap'
import PostCard from 'components/Cards/Post'
import { STUDENT_EXAM_IDS_QUERY } from 'constants/grade'
import StudentExam from './StudentExam'
import Select from 'react-select'
import Loading from 'components/Loading'

const ClassExamShow = (props) => {
  const { data } = useQuery(CLASS_CATEGORIES_QUERY, {
    variables: {
      id: props.id,
    },
  })

  const [selectedStudentExam, setSelectedStudentExam] = useState(null)

  const STUDENT_EXAM_ID_RES = useQuery(STUDENT_EXAM_IDS_QUERY, {
    variables: {
      exam_id: props.examId,
    },
  })

  const [students, setStudents] = useState(null)

  let studentExams = []
  if (STUDENT_EXAM_ID_RES) studentExams = STUDENT_EXAM_ID_RES?.data?.studentExams

  useEffect(() => {
    if (studentExams?.length) {
      const studentTakesExam = studentExams?.map((exam) => ({
        label: `${exam.student.identity.first_name} ${exam.student.identity.last_name}`,
        value: exam.student.id,
      }))
      if (studentTakesExam?.length) {
        setStudents(studentTakesExam)
      }
    }
  }, [studentExams])

  const [success, setSuccess] = useState(null)
  const exam = data?.class?.class_categories.find((category) => category.id === props.categoryId)?.exams?.find((exam) => exam.id === props.examId)

  const { inputs, handleChange, resetForm } = useState(null)
  const [gradeExam, { loading, error }] = useMutation(GRADE_STUDENT_EXAM_MUTATION, {
    variables: {
      exam_id: props.examId,
      ...inputs,
    },
  })

  const [selected, setSelected] = useState(null)

  useEffect(() => {
    setSelectedStudentExam(() => selected)
  }, [selected])

  if (loading) return <Spinner />

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader className="d-flex justify-content-between">
                <H3 className="title">Exam</H3>
              </CardHeader>
              <Error error={error} />
              <Success success={success} />
              <CardBody style={{ padding: '1rem 2rem' }}>
                {exam && Object.values(exam).length && (
                  <>
                    <PostCard
                      key={exam.id}
                      title={exam.name}
                      info={`Attempts: ${exam.attempts}`}
                      date={`Due Date: ${exam.due_at ? moment(exam.due_at).format('YYYY-MM-DD') : 'Not Specified'}`}
                      description={exam.description}
                    />
                  </>
                )}
                {students?.length ? (
                  <>
                    <Select
                      options={students}
                      onChange={(e) => {
                        const selected = studentExams.find((s) => s?.student?.id === e.value)
                        if (selected) setSelected(() => selected)
                      }}
                    />
                    {selectedStudentExam && <StudentExam exam={{ ...exam, ...selectedStudentExam }} />}
                  </>
                ) : (
                  <Loading />
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default ClassExamShow
