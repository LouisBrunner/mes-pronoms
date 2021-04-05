import {TABLE} from 'logic/content/choices'
import {useFormContext, useWatch} from 'react-hook-form'
import {PronounKind, PronounList, PronounPick} from 'logic/types'
import * as yup from 'yup'
import {ErrorMessage} from './ErrorMessage'

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
  choice: yup.string().required(),
  custom: yup.string(),
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
  const {register, control} = useFormContext<FormValues>()
  const choice = useWatch<FormValues>({
    control,
    name: 'choice',
  })

  return (
    <>
      <label htmlFor="choose_pronoun">Pronom: </label>
      <select id="choose_pronoun" {...register('choice')}>
        {Options[pronoun].map(([value, text]) => {
          return <option key={value} value={value}>{text}</option>
        })}
      </select>
      <ErrorMessage name="choice" />
      {choice === 'write_in' ? (
        <>
          <label htmlFor="custom_pronoun">Autre: </label>
          <input type="text" id="custom_pronoun" {...register('custom')} />
          <ErrorMessage name="custom" />
        </>
      ) : null}
    </>
  )
}
