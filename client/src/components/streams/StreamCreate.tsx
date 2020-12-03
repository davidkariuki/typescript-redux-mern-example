import React, { FC } from "react"
import { connect, ConnectedProps } from "react-redux"

import { createStream } from "../../actions"
import StreamForm from "./StreamForm"

const StreamCreate: FC<StreamCreateProps> = ({ createStream }) => {
  const onSubmit = (formValues: any) => {
    createStream(formValues)
  }

  return (
    <div>
      <h3>Create a Stream</h3>
      <StreamForm onSubmit={onSubmit} />
    </div>
  )
}

const connector = connect(null, { createStream })
type StreamCreateProps = ConnectedProps<typeof connector>

export default connector(StreamCreate)
