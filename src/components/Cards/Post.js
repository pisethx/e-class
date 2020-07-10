import React, { useState, createRef, useRef, forwardRef, useContext } from 'react'

import { Button, Badge, Card, CardBody, CardFooter, CardText, FormGroup, Form, Input, Row, Col, CardHeader, Label } from 'reactstrap'
import ChangeEmail from 'components/Forms/ChangeEmail'
import ChangePassword from '../Forms/ChangePassword'
import { AuthContext } from 'contexts/auth'
import EditProfile from 'components/Forms/EditProfile'
import { NavLink } from 'react-router-dom'

const PostCard = ({ title, info, date, badge, description, anchorBtn, showBtn, editBtn, deleteBtn }) => {
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
        {editBtn && (
          <NavLink to={editBtn.path}>
            <Button size="sm" className="mr-3 my-1 animation-on-hover " color="success">
              {editBtn.name}
            </Button>
          </NavLink>
        )}
        {deleteBtn && (
          <NavLink to={deleteBtn.path}>
            <Button size="sm" className="mr-3 my-1 animation-on-hover " color="danger">
              {deleteBtn.name}
            </Button>
          </NavLink>
        )}
      </CardBody>
    </Card>
  )
}

export default PostCard
