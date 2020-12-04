import React, { FC, useEffect } from "react"
import { connect, ConnectedProps } from "react-redux"
import { RouteComponentProps } from "react-router-dom"

import { RootState } from "../../reducers"
import { fetchStream } from "../../actions"

type TParams = {
  id: string
}

const StreamShow: FC<StreamShowProps & RouteComponentProps<TParams>> = ({
  fetchStream,
  stream,
  match: {
    params: { id },
  },
}) => {
  useEffect(() => {
    fetchStream(id)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (!stream) {
    return <div>Loading</div>
  }

  return (
    <div>
      <h1>{stream.title}</h1>
      <h5>{stream.description}</h5>
    </div>
  )
}

const mapState = (state: RootState, ownProps: RouteComponentProps<TParams>) => {
  return { stream: state.streams[ownProps.match.params.id] }
}

const connector = connect(mapState, { fetchStream })
type StreamShowProps = ConnectedProps<typeof connector>

export default connector(StreamShow)
