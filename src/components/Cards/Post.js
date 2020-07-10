import React, { useState, createRef, useRef, forwardRef, useContext } from 'react'

import { Button, Card, CardBody, CardFooter, CardText, FormGroup, Form, Input, Row, Col, CardHeader, Label, Badge } from 'reactstrap'
import { NavLink } from 'react-router-dom'
import Delete from 'components/Forms/Delete'

const PostCard = ({ id, badge, refetch, deleteMutation, title, info, date, description, anchorBtn, showBtn, editBtn, deleteBtn }) => {
  console.log(id)

  return (
    <Card
      style={{
        padding: '.5rem',
      }}
    >
      <CardHeader style={{ fontWeight: 'bold' }}>{title}</CardHeader>
      {info && (
        <CardFooter style={{ fontWeight: 'bold' }}>
          {info}
          <span className="ml-2">( {date} )</span>
          {badge && (
            <div>
              <Badge color="primary" pill>
                {badge}
              </Badge>
            </div>
          )}
        </CardFooter>
      )}

      <CardBody>
        <CardText className="mb-3">{description}</CardText>
        {anchorBtn && (
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

export default PostCard
