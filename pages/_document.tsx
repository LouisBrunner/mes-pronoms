import {AppProps} from 'next/app'
import Document, {DocumentContext, DocumentInitialProps} from 'next/document'
import {ServerStyleSheet} from 'styled-components'

// FIXME: find a better import?
import type {AppType, ComponentsEnhancer, RenderPageResult} from 'next/dist/next-server/lib/utils'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = (options?: ComponentsEnhancer): RenderPageResult | Promise<RenderPageResult> => {
        return originalRenderPage({
          ...options,
          enhanceApp: (App: AppType): AppType => {
            return (props: AppProps): JSX.Element => {
              return sheet.collectStyles(<App {...props} />)
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
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }
}
