import React, {useEffect, useState} from 'react'
import Script from 'next/script'

const AppScript = () => {
    return <>
        <Script src="https://accounts.google.com/gsi/client" strategy="lazyOnload"/>
    </>
}

export default AppScript
