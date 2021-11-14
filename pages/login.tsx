import React, {useEffect} from 'react'
import {NextPage} from 'next';
import {authenticateFacebook, authenticateGoogle} from '../requests/auth';

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
    window.FB.getLoginStatus(async (response: any) => {
        const token = response.authResponse.accessToken
        const result = await authenticateFacebook(token)
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
             data-layout="default" data-auto-logout-link="false" data-use-continue-as="false"
             data-scope="email"
             data-onlogin="handleFacebookAuth"/>
    </>
}

export default Login
