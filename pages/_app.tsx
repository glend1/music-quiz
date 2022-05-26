import '../styles/globals.css'
import Head from 'next/head'
import { Store } from '../code/util/store/store'
import { Provider } from 'react-redux'
import { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (<>
    <Head>
      <title>Music Quiz</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Provider store={Store}>
      <Component {...pageProps} />
    </Provider>
  </>)
}