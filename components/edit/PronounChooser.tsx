import {choosePronoun, ChosenPronoun, fetchGrammar} from 'logic/business'
import {IPronounStore, PronounKind} from 'logic/types'
import {PronounChoice} from 'components/view/PronounChoice'
import {FormValues, PronounChooserForm, schema, transformFromForm, transformToForm} from 'components/edit/PronounChooserForm'
import {useEffect, useRef} from 'react'
import {Formik, FormikConfig, useFormikContext} from 'formik'
import {IPronounContent} from 'logic/content/grammar'
import {usePronoun} from 'hooks/usePronoun'
import HelpIcon from '@material-ui/icons/HelpOutlineOutlined'
import {Box, Card, CardContent, CardHeader, Tooltip} from '@material-ui/core'

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
  const previous = useRef<Promise<void> | undefined>()
  const {values, submitForm} = useFormikContext<FormValues>()

  // Auto-submit on all changes
  useEffect(() => {
    const trampoline = async (): Promise<void> => {
      if (previous.current != undefined) {
        await previous.current
        previous.current = undefined
      }
      previous.current = submitForm()
    }
    // eslint-disable-next-line  @typescript-eslint/no-floating-promises
    trampoline()
  }, [previous, values, submitForm])

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
      <>
        <Card>
          <CardHeader
            action={
              <Tooltip arrow title={grammar.description}>
                <HelpIcon />
              </Tooltip>
            }
            title={grammar.title}
          />
          <CardContent>
            <PronounChooserForm pronoun={pronoun} />

            <Box minHeight={180} marginTop={3}>
              <DisplayContent grammar={grammar} choice={choice} />
            </Box>
          </CardContent>
        </Card>

        <AutoSubmit />
        <NotifyParent onValid={onValid} />
      </>
    </Formik>
  )
}
