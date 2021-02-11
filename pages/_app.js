import Head from 'next/head'
import { ThemeProvider } from 'styled-components'

import { IDXProvider } from '../components/contexts/idx-context'
import { ReviewsProvider } from '../components/contexts/reviews-context'
import withIdx from '../components/hoc/withIdx'
import theme from '../util/theme'
import GlobalStyles from '../components/ui/GlobalStyles'

function MyApp({ Component, pageProps, idx }) {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Tempo tracks the rhythm of your 2C team."
        />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <IDXProvider value={idx}>
          <ReviewsProvider>
            <GlobalStyles />
            <Component {...pageProps} />
          </ReviewsProvider>
        </IDXProvider>
      </ThemeProvider>
    </>
  )
}

export default withIdx(MyApp)
