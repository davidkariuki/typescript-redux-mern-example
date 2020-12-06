import React, { FC, useEffect, useRef } from "react"
import { connect, ConnectedProps } from "react-redux"
import { RouteComponentProps } from "react-router-dom"
import flv from "flv.js"

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
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    fetchStream(id)

    const player = flv.createPlayer({
      type: "flv",
      url: `http://localhost:8000/live/${id}.flv`,
    })

    player.attachMediaElement(videoRef.current as HTMLVideoElement)
    player.load()

    return function cleanup() {
      player.destroy()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <video ref={videoRef} style={{ width: "100%" }} controls />
      {stream && (
        <>
          <h1>{stream.title}</h1>
          <h5>{stream.description}</h5>
        </>
      )}
    </div>
  )
}

const mapState = (state: RootState, ownProps: RouteComponentProps<TParams>) => {
  return { stream: state.streams[ownProps.match.params.id] }
}

const connector = connect(mapState, { fetchStream })
type StreamShowProps = ConnectedProps<typeof connector>

export default connector(StreamShow)
