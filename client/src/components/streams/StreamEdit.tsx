import React, { FC, useEffect } from "react"
import { RouteComponentProps } from "react-router-dom"
import { connect, ConnectedProps } from "react-redux"

import { RootState } from "../../reducers"
import { fetchStream } from "../../actions"

type TParams = {
  id: string
}

const StreamEdit: FC<RouteComponentProps<TParams> & StreamEditProps> = ({
  match: {
    params: { id },
  },
  stream,
  fetchStream,
}) => {
  useEffect(() => {
    fetchStream(id)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (!stream) {
    return <></>
  }

  return <div>StreamEdit for {stream.title}</div>
}

const mapState = (state: RootState, ownProps: RouteComponentProps<TParams>) => {
  const id = ownProps.match.params.id

  return { stream: state.streams[id] }
}

const connector = connect(mapState, { fetchStream })
type StreamEditProps = ConnectedProps<typeof connector>

export default connector(StreamEdit)
