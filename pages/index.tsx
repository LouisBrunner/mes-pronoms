import {NextPage} from 'next'
import Link from 'next/link'
import {Layout} from 'components/Layout'
import {packStore} from 'logic/storage/packing'
import {IEL} from 'logic/content/iel'
import {Container, Button, Grid, Typography, Box} from '@material-ui/core'
import CreateIcon from '@material-ui/icons/CreateRounded'
import VisibilityIcon from '@material-ui/icons/VisibilityRounded'
import {Alert} from '@material-ui/lab'

type HomeProps = {
  nothing?: undefined,
}

const Home: NextPage<HomeProps> = (): JSX.Element => {
  return (
    <Layout>
      <Box paddingTop={8} paddingBottom={6}>
        <Container maxWidth="sm">
          <Typography component="h1" variant="h2" align="center" color="textPrimary" paragraph>
            Bienvenue!
          </Typography>
          <Typography variant="h5" align="center" color="textSecondary" paragraph>
            Ce site vous permet de facilement montrer et expliquer les pronoms que vous souhaitez utiliser.
            La langue française est extrêmement genrée et j&apos;espère que cet outil vous aidera à retenir les tournures de phrases à utiliser avec des néo-pronoms.
          </Typography>
          <Box marginTop={4}>
            <Grid container spacing={2} justify="center">
              <Grid item>
                <Link href="/e/" passHref>
                  <Button variant="contained" color="primary" startIcon={<CreateIcon />}>
                    Choisir les votres
                  </Button>
                </Link>
              </Grid>
              <Grid item>
                <Link href={`/v/${packStore(IEL, {compress: true})}`} passHref>
                  <Button variant="outlined" color="primary" startIcon={<VisibilityIcon />}>
                    Voir un exemple
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>

      <Box marginTop={5} marginBottom={2}>
        <Container maxWidth="md">
          <Alert severity="warning">
            Une fois que vous avez fais votre sélection, vous pouvez partager ce lien n&apos;importe où.
            Attention cependant, si vous changez votre sélection, le lien changera également et vous devrez le mettre à jour à tous les endroits où vous l&apos;avez publié précedemment.
          </Alert>
        </Container>
      </Box>
    </Layout>
  )
}

export default Home
