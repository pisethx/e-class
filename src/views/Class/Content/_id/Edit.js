import React, { useState } from 'react'
import { ONE_CLASS_CONTENT_QUERY } from 'constants/class'
import Error from 'views/shared/ErrorMessage'
import Success from 'views/shared/SuccessMessage'
import { Editor } from '@tinymce/tinymce-react'

import { useQuery } from 'react-apollo'
import ClassContentCreate from '../Create'
import Loading from 'components/Loading'

const ClassContentEdit = (props) => {
  console.log(props.contentId)
  const { data, loading, error } = useQuery(ONE_CLASS_CONTENT_QUERY, {
    variables: {
      id: props.contentId,
    },
  })

  const content = data?.classContent

  if (error) return <Error error={error} />
  console.log(data)

  return <>{content ? <ClassContentCreate content={{ ...content, id: props.contentId }} /> : <Loading />}</>
}

export default ClassContentEdit
