import {choosePronoun, fetchGrammar} from 'logic/business'
import {IPronounStore, PronounChangeEvent, PronounKind} from 'logic/types'
import {PronounChoice} from 'components/PronounChoice'
import {useForm, FormProvider} from 'react-hook-form'
import {FormValues, PronounChooserForm, schema, transformFromForm, transformToForm} from 'components/PronounChooserForm'
import {yupResolver} from '@hookform/resolvers/yup'
import {useCallback, useEffect, useState} from 'react'

export interface PronounChooserProps {
  store: IPronounStore,
  pronoun: PronounKind,
  onValid: (valid: boolean) => void,
}

export const PronounChooser = ({store, pronoun, onValid}: PronounChooserProps): JSX.Element => {
  const grammar = fetchGrammar(pronoun)
  const [picked, setPicked] = useState(store.get(pronoun))
  const choice = choosePronoun(pronoun, picked)

  const methods = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: transformToForm(picked),
    resolver: yupResolver(schema),
  })
  const {formState, reset} = methods



  methods.watch(useCallback((values) => {
    console.log('watch', values, transformFromForm(values))
    store.set(pronoun, transformFromForm(values))
    console.log(formState)
    onValid(formState.isValid)
  }, [store, pronoun, onValid, formState]))

  useEffect(() => {
    // FIXME: nextjs SSR?
    const currentPicked = store.get(pronoun)
    setPicked(currentPicked)
    reset(transformToForm(currentPicked))
    console.log('use effect')

    const observer = (e: PronounChangeEvent): void => {
      if (e.detail.pronoun !== pronoun) {
        return
      }
      setPicked(e.detail.choice)
    }
    store.addEventListener('changed', observer)
    return (): void => {
      store.removeEventListener('changed', observer)
    }
  }, [setPicked, store, pronoun, reset])

  return (
    <FormProvider {...methods}>
      <div>
        <h4>{grammar.title}</h4>
        <p>{grammar.description}</p>
        <PronounChooserForm pronoun={pronoun} />
        {choice === undefined ? (
          null
        ) : (
          <PronounChoice choice={choice} grammar={grammar} />
        )}
      </div>
    </FormProvider>
  )
}
