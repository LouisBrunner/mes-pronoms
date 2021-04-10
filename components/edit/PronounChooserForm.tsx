import {Box, FormControl, FormHelperText, InputLabel, Select, TextField} from '@material-ui/core'
import {ErrorMessage, Field, FieldProps, useField} from 'formik'
import {TABLE} from 'logic/content/choices'
import {PronounKind, PronounList, PronounPick} from 'logic/types'
import * as yup from 'yup'

export type Invalid = 'invalid'
export type WriteIn = 'write_in'

type Option = [number | WriteIn | Invalid, string]

const Options = ((): Partial<Record<PronounKind, Option[]>> => {
  const options: Partial<Record<PronounKind, Option[]>> = {}
  PronounList.forEach((pronoun) => {
    const poptions: Option[] = []
    poptions.push(['invalid', 'Non renseigné'])
    poptions.push(...TABLE.pronouns[pronoun].db.map<Option>((entry) => {
      return [entry.id, entry.word]
    }))
    poptions.push(['write_in', 'Autre'])
    options[pronoun] = poptions
  })
  return options
})()


export const schema = yup.object().shape({
  choice: yup.mixed()
    .required()
    .notOneOf(['invalid'], 'Vous devez renseignez un pronom'),
  custom: yup.string()
    .when('choice', {
      is: 'write_in',
      then: yup.string()
        .required('Vous devez renseignez Autre'),
      otherwise: yup.string(),
    }),
})

export type FormValues = {
  choice: number | WriteIn | Invalid,
  custom: string,
}

export const transformToForm = (pick: PronounPick | undefined): FormValues => {
  if (pick === undefined) {
    return {
      choice: 'invalid',
      custom: '',
    }
  } else if (typeof pick === 'string') {
    return {
      choice: 'write_in',
      custom: pick,
    }
  }
  return {
    choice: pick,
    custom: '',
  }
}

export const transformFromForm = (form: FormValues): PronounPick | undefined => {
  if (form.choice === 'invalid') {
    return undefined
  } else if (form.choice === 'write_in') {
    return form.custom
  }
  return parseInt(`${form.choice}`)
}

export type PronounChooserFormProps = {
  pronoun: PronounKind,
}

export const PronounChooserForm = ({pronoun}: PronounChooserFormProps): JSX.Element => {
  const [_, {value: choice}] = useField<FormValues['choice']>('choice')

  return (
    <>
      <Box>
        <Field name="choice">
          {({field, meta}: FieldProps<FormValues['choice']>): JSX.Element => {
            return (
              <FormControl fullWidth variant="outlined" error={meta.error && meta.touched}>
                <InputLabel htmlFor="choice-label">Choix</InputLabel>
                <Select {...field}
                  fullWidth
                  native
                  id="choice-label"
                  label="Choix"
                  inputProps={{id: 'choice-label', name: field.name}}
                >
                  {Options[pronoun].map(([value, text]) => {
                    return <option key={value} value={value}>{text}</option>
                  })}
                </Select>
                <ErrorMessage component={FormHelperText} name="choice" />
              </FormControl>
            )
          }}
        </Field>
      </Box>

      <Box marginTop={2}>
        {choice === 'write_in' ? (
          <Field name="custom">
            {({field, meta}: FieldProps<FormValues['custom']>): JSX.Element => {
              return (
                <TextField
                  {...field}
                  fullWidth
                  error={meta.error && meta.touched}
                  label="Autre"
                  helperText={meta.error}
                  variant="outlined"
                />
              )
            }}
          </Field>
        ) : null}
      </Box>
    </>
  )
}
