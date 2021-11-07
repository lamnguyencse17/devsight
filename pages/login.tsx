import React, {useEffect} from 'react'
import {NextPage} from "next";

declare global {
    interface Window {
        handleGoogleAuth: (response: any) => void;
    }
}

const Login: NextPage = () => {
    useEffect(() => {
        window.handleGoogleAuth = handleGoogleAuth
    }, []);
    const handleGoogleAuth = (response: any) => {
        console.log(response)
    }
    return <>
        <div id="g_id_onload"
             data-client_id={process.env.GOOGLE_CLIENT_ID}
             data-callback="handleGoogleAuth"
             data-auto_prompt="false">
        </div>
        <div className="g_id_signin"
             data-type="standard"
             data-size="large"
             data-theme="outline"
             data-text="sign_in_with"
             data-shape="rectangular"
             data-logo_alignment="left">
        </div>
    </>
}

export default Login
