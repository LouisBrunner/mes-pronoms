import {choosePronoun, ChosenPronoun, fetchGrammar} from 'logic/business'
import {IPronounStore, PronounKind} from 'logic/types'
import {PronounChoice} from 'components/view/PronounChoice'
import {FormValues, PronounChooserForm, schema, transformFromForm, transformToForm} from 'components/edit/PronounChooserForm'
import {useEffect, useState} from 'react'
import {Formik, FormikConfig, useFormikContext} from 'formik'
import {IPronounContent} from 'logic/content/grammar'

type AutoSubmitProps = {
  onValid: (valid: boolean) => void,
}

const AutoSubmit = ({onValid}: AutoSubmitProps): null => {
  const {values, isValid, submitForm} = useFormikContext()
  useEffect(() => {
    // FIXME: react's fault
    // eslint-disable-next-line  @typescript-eslint/no-floating-promises
    submitForm()
  }, [values, submitForm])
  useEffect(() => {
    onValid(isValid)
  }, [isValid, onValid])
  return null
}

type DisplayContentProps = {
  grammar: IPronounContent,
  choice: ChosenPronoun,
}

const DisplayContent = ({grammar, choice}: DisplayContentProps): JSX.Element | null => {
  const {isValid} = useFormikContext<FormValues>()
  if (!isValid || !choice) {
    return null
  }
  return <PronounChoice choice={choice} grammar={grammar} />
}

export interface PronounChooserProps {
  store: IPronounStore,
  pronoun: PronounKind,
  onValid: (valid: boolean) => void,
}

export const PronounChooser = ({store, pronoun, onValid}: PronounChooserProps): JSX.Element => {
  const grammar = fetchGrammar(pronoun)
  const [picked, setPicked] = useState(store.get(pronoun))
  const choice = choosePronoun(pronoun, picked)
  const [initialFormValues, setInitialFormValues] = useState(transformToForm(picked))

  const form: FormikConfig<FormValues> = {
    initialValues: initialFormValues,
    enableReinitialize: true,
    validationSchema: schema,
    onSubmit: (values) => {
      const newValue = transformFromForm(values)
      store.set(pronoun, newValue)
      setPicked(newValue)
    },
  }

  // FIXME: nextjs ssr?
  useEffect(() => {
    const picked = store.get(pronoun)
    setPicked(picked)
    setInitialFormValues(transformToForm(picked))
  }, [store, pronoun, setPicked, setInitialFormValues])

  return (
    <Formik {...form}>
      <div>
        <h4>{grammar.title}</h4>
        <p>{grammar.description}</p>
        <AutoSubmit onValid={onValid} />
        <PronounChooserForm pronoun={pronoun} />
        <DisplayContent grammar={grammar} choice={choice} />
      </div>
    </Formik>
  )
}
