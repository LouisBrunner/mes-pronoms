import {AppProps} from 'next/app'
import Document, {DocumentContext, DocumentInitialProps} from 'next/document'
import {ServerStyleSheet} from 'styled-components'
import {ServerStyleSheets} from '@material-ui/core/styles'
import {AppType, ComponentsEnhancer, RenderPageResult} from 'next/dist/shared/lib/utils'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet()
    const sheets = new ServerStyleSheets()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = (options?: ComponentsEnhancer): RenderPageResult | Promise<RenderPageResult> => {
        return originalRenderPage({
          ...options,
          enhanceApp: (App: AppType): AppType => {
            return (props: AppProps): JSX.Element => {
              return sheets.collect(
                sheet.collectStyles(
                  <App {...props} />
                )
              )
            }
          },
        })
      }

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheets.getStyleElement()}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }
}
