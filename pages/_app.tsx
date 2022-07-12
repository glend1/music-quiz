import '../styles/globals.css'
import Head from 'next/head'
import { AppProps } from 'next/app';
import { GlobalAudioContext } from '../src/util/context/audiocontext';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (<>
    <Head>
      <title>Music Quiz</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <GlobalAudioContext>
      <Component {...pageProps} />
    </GlobalAudioContext>
  </>)
}