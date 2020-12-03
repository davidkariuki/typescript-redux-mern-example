import React, { FC } from "react"
import { Field, reduxForm, InjectedFormProps } from "redux-form"

type StreamFormProps = {
  onSubmit(formValues: any): void
}
type InjectedProps = InjectedFormProps<{}, StreamFormProps>

const StreamForm: FC<InjectedProps & StreamFormProps> = ({
  onSubmit,
  handleSubmit,
}) => {
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

export default reduxForm<any, StreamFormProps>({
  form: "streamForm",
  validate,
})(StreamForm)
