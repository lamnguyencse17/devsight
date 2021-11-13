import React from 'react'
import Script from 'next/script'

const fbAsyncInit = () => {
    if (!process.env.FB_API_VERSION) {
        console.error('NO FB API VERSION PROVIDED')
        throw new Error('NO FB API VERSION PROVIDED')
    }
    window.FB.init({
        appId: process.env.FB_APP_ID,
        oauth: true,
        status: true,
        cookie: true,
        xfbml: true,
        version: process.env.FB_API_VERSION
    });
}

const AuthScript = () => {
    return <>
        <Script src="https://accounts.google.com/gsi/client" strategy="lazyOnload"/>
        <Script crossOrigin="anonymous"
                src="https://connect.facebook.net/en_US/sdk.js"
                nonce="426nBNZw" strategy="lazyOnload" onLoad={fbAsyncInit}/>
    </>
}

export default AuthScript
