import React, { FC } from "react"
import { Field, reduxForm, InjectedFormProps } from "redux-form"
import { connect, ConnectedProps } from "react-redux"

import { createStream } from "../../actions"
//import { Stream } from "../../types"

type InjectedProps = InjectedFormProps<{}, StreamCreateProps>

const StreamCreate: FC<InjectedProps & StreamCreateProps> = ({
  handleSubmit,
  createStream,
}) => {
  const renderError = ({
    error,
    touched,
  }: {
    error: string
    touched: boolean
  }) => {
    if (error && touched) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      )
    }
  }

  const renderInput = ({ input, label, meta }: any) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`

    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {renderError(meta)}
      </div>
    )
  }

  const onSubmit = (formValues: any) => {
    createStream(formValues)
  }

  return (
    <form className="ui form error" onSubmit={handleSubmit(onSubmit)}>
      <Field name="title" component={renderInput} label="Enter Title" />
      <Field
        name="description"
        component={renderInput}
        label="Enter Description"
      />
      <button className="ui button primary">Submit</button>
    </form>
  )
}

const validate = (formValues: any) => {
  const errors: any = {}

  if (!formValues.title) {
    errors.title = "You must enter a title"
  }

  if (!formValues.description) {
    errors.description = "You must enter a description"
  }

  return errors
}

//const mapState = (state: PostsState): PostsState => {
//return { posts: state.posts }
//}

const connector = connect(null, { createStream })
type StreamCreateProps = ConnectedProps<typeof connector>

const formWrapped = reduxForm<any, StreamCreateProps>({
  form: "streamCreate",
  validate,
})(StreamCreate)

export default connector(formWrapped)
