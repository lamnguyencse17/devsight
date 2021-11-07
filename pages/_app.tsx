import React from "react";
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import dynamic from "next/dynamic";
const AppScript = dynamic(() => import('../components/AppScript'), {ssr: false})

function MyApp({ Component, pageProps }: AppProps) {
  return <>
      <AppScript/>
      <Component {...pageProps} />
  </>
}

export default MyApp
