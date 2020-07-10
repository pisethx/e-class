import React, { useState, createRef, useRef, forwardRef, useContext } from 'react'

import { Button, Card, CardBody, CardFooter, CardText, FormGroup, Form, Input, Row, Col, CardHeader, Label, Badge } from 'reactstrap'
import { NavLink } from 'react-router-dom'
import Delete from 'components/Forms/Delete'
import moment from 'moment'

const ExamPostCard = ({
  id,
  badge,
  refetch,
  deleteMutation,
  title,
  publishes_at,
  due_at,
  attempts,
  description,
  anchorBtn,
  showBtn,
  editBtn,
  deleteBtn,
}) => {
  console.log(id)

  return (
    <Card
      style={{
        padding: '.5rem',
      }}
    >
      <CardHeader style={{ fontWeight: 'bold' }}>{title}</CardHeader>
      <CardFooter style={{ fontWeight: 'bold' }}>
        <span className="ml-2">
          <Row className="ml-1">Allowed Attempts : {attempts}</Row>
          <Row className="ml-1">Publishes at : {publishes_at ? moment(publishes_at).format('llll') : 'Not Specified'}</Row>
          <Row className="ml-1">Dues at : {due_at ? moment(due_at).format('llll') : 'Not Specified'}</Row>
        </span>
        {badge && (
          <div>
            <Badge color="primary" pill>
              {badge}
            </Badge>
          </div>
        )}
      </CardFooter>

      <CardBody>
        <CardText className="mb-3">{description}</CardText>
        {anchorBtn && moment(due_at).isBefore() && (
          <a href={anchorBtn.path} target="_blank">
            <Button size="sm" className="btn-simple mr-3 my-1 animation-on-hover " color="info">
              {anchorBtn.name}
            </Button>
          </a>
        )}
        {showBtn && (
          <NavLink to={showBtn.path}>
            <Button size="sm" className="mr-3 my-1 animation-on-hover " color="info">
              {showBtn.name}
            </Button>
          </NavLink>
        )}
        {editBtn &&
          moment(publishes_at).isBefore() &&
          (editBtn.custom ? (
            editBtn.modal
          ) : (
            <NavLink to={editBtn.path}>
              <Button size="sm" className="mr-3 my-1 animation-on-hover " color="success">
                {editBtn.name}
              </Button>
            </NavLink>
          ))}
        {deleteBtn && <Delete name={title} id={id} deleteMutation={deleteMutation} refetch={refetch} />}
      </CardBody>
    </Card>
  )
}

export default ExamPostCard
