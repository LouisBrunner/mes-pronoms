import {useFormContext, FieldPath, FieldValues, FieldError} from 'react-hook-form'

export type ErrorMessageProps<Values> = {
  name: FieldPath<Values>,
}

export const ErrorMessage = <Values extends FieldValues>({name}: ErrorMessageProps<Values>): JSX.Element | null => {
  const {formState: {errors}} = useFormContext<Values>()
  const error: FieldError = errors[name]
  if (!error?.message) {
    return null
  }
  return <p>{error.message}</p>
}
