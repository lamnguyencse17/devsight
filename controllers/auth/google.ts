import {createNewAuth, generateToken, verifyGoogleAndFindUser} from "@services/auth";
import isEmpty from "lodash/isEmpty";
import {createUser} from "@services/user";
import {serialize} from "cookie";
import logger from "@utils/logger";
import {NextApiRequest, NextApiResponse} from "next";
import {Response} from "@common/api/response";
import {OAuth2Client} from "google-auth-library";


const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export default async (req: NextApiRequest,
                      res: NextApiResponse<Response>) => {
    const token = req.body.token
    try {
        const ticket = await googleClient.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        if (!payload) {
            return res.status(401).json({code: 401, message: 'Google credential is not found'})
        }
        const email = payload['email'] as string;
        const user = await verifyGoogleAndFindUser(email)
        if (isEmpty(user)) {
            const name = payload['name'] as string;
            const picture = payload['picture'] as string;
            const newUser = await createUser({email, name, avatar: picture})
            const generatedToken = await createNewAuth({email, user: newUser._id})
            res.setHeader('Set-Cookie', serialize('token', generatedToken, {httpOnly: true, secure: true, sameSite: true, maxAge: 3600*24, path: '/'}))
            return res.status(200).json({code: 200, payload: {user: newUser, token: generatedToken}})
        }
        const generatedToken = generateToken(user.email, user._id)
        res.setHeader('Set-Cookie', serialize('token', generatedToken, {httpOnly: true, secure: true, sameSite: true, maxAge: 3600*24, path: '/'}))
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
