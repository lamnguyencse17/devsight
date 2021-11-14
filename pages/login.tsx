import React, {useEffect} from 'react'
import {NextPage} from "next";
import {authenticateGoogle} from "../requests/auth";
import Script from "next/script";

declare global {
    interface Window {
        handleGoogleAuth: (response: any) => void;
        handleFacebookAuth: () => void;
        FB: any
    }
}

const handleGoogleAuth = async (response: any) => {
    const result = await authenticateGoogle(response.credential)
}

const handleFacebookAuth = async () => {
    window.FB.api('/me/permissions', (response: any) => {
        console.log(response)
    })
    window.FB.api('/me', (response: any) => {
        console.log(response)
    })
}

const Login: NextPage = () => {
    useEffect(() => {
        window.handleGoogleAuth = handleGoogleAuth
        window.handleFacebookAuth = handleFacebookAuth
    }, []);

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
        <div className="fb-login-button" data-width="100" data-size="large" data-button-type="login_with"
    data-layout="default" data-auto-logout-link="false" data-use-continue-as="false" data-scope="public_profile,email"
        data-onlogin="handleFacebookAuth"/>
    </>
}

export default Login
