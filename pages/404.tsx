import {Box, Button, Container, Grid, Typography} from '@material-ui/core'
import {Layout} from 'components/Layout'
import Link from 'next/link'
import HomeIcon from '@material-ui/icons/HomeRounded'

const Error404 = (): JSX.Element => {
  return (
    <Layout>
      <Box paddingTop={8} paddingBottom={6}>
        <Container maxWidth="sm">
          <Typography component="h1" variant="h4" align="center" color="textPrimary" paragraph>
            Page introuvable
          </Typography>
          <Typography variant="h6" align="center" color="textSecondary" paragraph>
            Cette page n&apos;existe pas ou plus
          </Typography>
          <Box marginTop={4}>
            <Grid container spacing={2} justify="center">
              <Grid item>
                <Link href="/" passHref>
                  <Button variant="contained" color="primary" startIcon={<HomeIcon />}>
                    Accueil
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </Layout>
  )
}

export default Error404
