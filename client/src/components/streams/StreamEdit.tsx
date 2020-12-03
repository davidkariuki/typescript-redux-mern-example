import React, { FC, useEffect } from "react"
import { RouteComponentProps } from "react-router-dom"
import { connect, ConnectedProps } from "react-redux"
import _ from "lodash"

import { RootState } from "../../reducers"
import { fetchStream, editStream } from "../../actions"
import StreamForm from "./StreamForm"

type TParams = {
  id: string
}

const StreamEdit: FC<RouteComponentProps<TParams> & StreamEditProps> = ({
  match: {
    params: { id },
  },
  stream,
  fetchStream,
  editStream,
}) => {
  useEffect(() => {
    fetchStream(id)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = (formValues: any) => {
    editStream(stream.id, formValues)
  }

  if (!stream) {
    return <></>
  }

  return (
    <div>
      <h3>Edit a Stream</h3>
      <StreamForm
        initialValues={_.pick(stream, "title", "description")}
        onSubmit={onSubmit}
      />
    </div>
  )
}

const mapState = (state: RootState, ownProps: RouteComponentProps<TParams>) => {
  const id = ownProps.match.params.id

  return { stream: state.streams[id] }
}

const connector = connect(mapState, { fetchStream, editStream })
type StreamEditProps = ConnectedProps<typeof connector>

export default connector(StreamEdit)
