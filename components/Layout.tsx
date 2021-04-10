import Head from 'next/head'
import {pathPrefix} from 'config'
import {ReactNode} from 'react'
import Link from 'next/link'
import {Typography, Toolbar, AppBar, Link as MLink, CssBaseline, ThemeProvider as MThemeProvider} from '@material-ui/core'
import {theme} from 'components/theme'
import {ThemeProvider} from 'styled-components'

export type LayoutProps = {
  menu?: ReactNode,
  children: ReactNode,
  title?: string,
}

export const Layout = ({title, menu, children}: LayoutProps): JSX.Element => {
  let htmlTitle = ''
  if (title) {
    htmlTitle = ` - ${title}`
  }
  return (
    <CssBaseline>
      <Head>
        <title>Mes Pronoms{htmlTitle}</title>

        <link rel="icon" href={`${pathPrefix}/favicon.ico`} />
        <link rel="apple-touch-icon" sizes="180x180" href={`${pathPrefix}/apple-touch-icon.png`} />
        <link rel="icon" type="image/png" sizes="32x32" href={`${pathPrefix}/favicon-32x32.png`} />
        <link rel="icon" type="image/png" sizes="16x16" href={`${pathPrefix}/favicon-16x16.png`} />
        <link rel="manifest" href={`${pathPrefix}/site.webmanifest`} />

        <meta name="theme-color" content={theme.palette.primary.main} />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <ThemeProvider theme={theme}>
        <MThemeProvider theme={theme}>
          <AppBar position="sticky">
            <Toolbar>
              <Typography variant="h6">
                <Link href="/" passHref>
                  <MLink color="inherit">Mes Pronoms</MLink>
                </Link>
              </Typography>
              {menu}
            </Toolbar>
          </AppBar>

          {children}
        </MThemeProvider>
      </ThemeProvider>
    </CssBaseline>
  )
}
