import {choosePronoun, ChosenPronoun, fetchGrammar} from 'logic/business'
import {IPronounStore, PronounKind} from 'logic/types'
import {PronounChoice} from 'components/view/PronounChoice'
import {FormValues, PronounChooserForm, schema, transformFromForm, transformToForm} from 'components/edit/PronounChooserForm'
import {useEffect} from 'react'
import {Formik, FormikConfig, useFormikContext} from 'formik'
import {IPronounContent} from 'logic/content/grammar'
import {usePronoun} from 'hooks/usePronoun'

type NotifyParentProps = {
  onValid: (valid: boolean) => void,
}

const NotifyParent = ({onValid}: NotifyParentProps): null => {
  const {isValid} = useFormikContext<FormValues>()

  // Notify parent when the form validity changes
  useEffect(() => {
    onValid(isValid)
  }, [isValid, onValid])

  return null
}

const AutoSubmit = (): null => {
  const {values, submitForm} = useFormikContext<FormValues>()

  // Auto-submit on all changes
  useEffect(() => {
    // eslint-disable-next-line  @typescript-eslint/no-floating-promises
    submitForm()
  }, [values, submitForm])

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
  const picked = usePronoun(store, pronoun)
  const grammar = fetchGrammar(pronoun)
  const choice = choosePronoun(pronoun, picked)

  const form: FormikConfig<FormValues> = {
    initialValues: transformToForm(picked),
    enableReinitialize: true,
    validateOnMount: true,
    validationSchema: schema,
    onSubmit: (values) => {
      store.set(pronoun, transformFromForm(values))
    },
  }

  return (
    <Formik {...form}>
      <div>
        <h4>{grammar.title}</h4>
        <p>{grammar.description}</p>
        <PronounChooserForm pronoun={pronoun} />
        <DisplayContent grammar={grammar} choice={choice} />

        <AutoSubmit />
        <NotifyParent onValid={onValid} />
      </div>
    </Formik>
  )
}
