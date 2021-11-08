import {NextApiRequest, NextApiResponse} from "next";
import connectMongoDB from "../../../lib/connectMongoDB";
import {Response} from "../../../common/api/response";
import jwt from 'jsonwebtoken'
import logger from "../../../utils/logger";
import {
    createNewAuth,
    generateToken,
    updateUserForNewGoogle,
    verifyGoogleAndFindUser,
    verifyTokenAndFindUser
} from "@services/auth";
import LocalToken from "../../../common/api/token";
import isEmpty from "lodash/isEmpty";
import {createUser} from "@services/user";
import {serialize} from "cookie";
const {OAuth2Client} = require('google-auth-library');

if (!process.env.GOOGLE_CLIENT_ID) {
    logger.error('NO GOOGLE CLIENT ID PROVIDED')
    throw new Error('NO GOOGLE CLIENT ID PROVIDED')
}
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const LOCAL_AUTH = 'local'
const GOOGLE_AUTH = 'google'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Response>
) {
    const {authType} = req.query;
    await connectMongoDB()
    switch (authType) {
        case LOCAL_AUTH: {
            if (!process.env.TOKEN_SECRET) {
                logger.error(new Error ('TOKEN SECRET NOT FOUND!'))
                return res.status(500).json({code: 500, message: 'Service is not available'})
            }
            const token = req.cookies.token
            try {
                const decodedToken = await jwt.verify(token, process.env.TOKEN_SECRET) as LocalToken
                const user = await verifyTokenAndFindUser(token, decodedToken.userId)
                return res.status(200).json({code: 200, payload: user})
            } catch (err) {
                logger.info(err)
                if (err instanceof Error) {
                    return res.status(401).json({code: 401, message: err.message})
                }
                return res.status(500).json({code: 500, message: 'Service is not available'})
            }
        }
        case GOOGLE_AUTH: {
            const token = req.body.token
            try {
                const ticket = await googleClient.verifyIdToken({
                    idToken: token,
                    audience: process.env.GOOGLE_CLIENT_ID,
                });
                const payload = ticket.getPayload();
                console.log(payload)
                const email = payload['email'] as string;
                const user = await verifyGoogleAndFindUser(email)
                if (isEmpty(user)) {
                    const name = payload['name']
                    const picture = payload['picture']
                    const newUser = await createUser({email, name, avatar: picture})
                    const generatedToken = await createNewAuth({email, user: newUser._id})
                    res.setHeader('Set-Cookie', serialize('token', generatedToken, {httpOnly: true, secure: true, sameSite: true, maxAge: 3600*1000*2}))
                    return res.status(200).json({code: 200, payload: {user: newUser, token: generatedToken}})
                }
                const generatedToken = generateToken(user.email, user._id)
                res.setHeader('Set-Cookie', serialize('token', generatedToken, {httpOnly: true, secure: true, sameSite: true, maxAge: 3600*1000*2}))
                return res.status(200).json({code: 200, payload: {user, token: generatedToken}})
            } catch (err) {
                if (err instanceof Error) {
                    logger.info(err.message)
                    return res.status(401).json({code: 401, message: err.message})
                }
                logger.error(err)
                return res.status(500).json({code: 500, message: 'Service is not available'})
            }

        }
        default: {
            return res.status(200).json({ code: 401, message: 'Auth type is not supported' })
        }
    }
}
