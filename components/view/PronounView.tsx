import {choosePronoun, fetchGrammar} from 'logic/business'
import {IPronounStore, PronounKind} from 'logic/types'
import {PronounChoice} from 'components/view/PronounChoice'
import {usePronoun} from 'hooks/usePronoun'
import {Card, CardContent, CardHeader, Tooltip, Typography} from '@material-ui/core'
import HelpIcon from '@material-ui/icons/HelpOutlineOutlined'

interface PronounViewProps {
  store: IPronounStore,
  pronoun: PronounKind,
}

export const PronounView = ({store, pronoun}: PronounViewProps): JSX.Element => {
  const picked = usePronoun(store, pronoun)
  const grammar = fetchGrammar(pronoun)
  const choice = choosePronoun(pronoun, picked)

  return (
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
        {choice === undefined ? (
          <Typography paragraph align="center"><strong>Non renseigné</strong></Typography>
        ) : (
          <PronounChoice choice={choice} grammar={grammar} />
        )}
      </CardContent>
    </Card>
  )
}
