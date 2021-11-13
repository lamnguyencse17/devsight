import React from "react";
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {useRouter} from "next/router";
import AuthScript from '../components/AuthScript'

function MyApp({ Component, pageProps }: AppProps) {
    const {pathname} = useRouter()

  return <>
      {(pathname === '/login' || pathname === '/register') && <AuthScript/>}
      <Component {...pageProps} />
  </>
}

export default MyApp
