import "../styles/globals.css";
import Head from "next/head";
import { AppProps } from "next/app";
import { GlobalAudioContext } from "../src/audio/audiocontext/audiocontext";
import Header from "../src/layout/header/header";
import Footer from "../src/layout/footer/footer";

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Music Quiz</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header />
			<GlobalAudioContext>
				<Component {...pageProps} />
			</GlobalAudioContext>
			<Footer />
		</>
	);
}
