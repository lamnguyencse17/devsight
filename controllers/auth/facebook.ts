import {NextApiRequest, NextApiResponse} from "next";
import {Response} from "@common/api/response";
import {authPayloadSchema} from "@validators/auth";
import {createNewAuth, generateToken, verifyAndFindUser, verifyFacebookToken} from "@services/auth";
import isEmpty from "lodash/isEmpty";
import {createUser, getFacebookProfilePicture} from "@services/user";
import {serialize} from "cookie";
import logger from "@utils/logger";

export default async (req: NextApiRequest,
                      res: NextApiResponse<Response>) => {
    try {
        const {token} = await authPayloadSchema.validate(req.body)
        const {email, name} = await verifyFacebookToken(token);
        const user = await verifyAndFindUser(email)
        if (isEmpty(user)) {
            const picture = await getFacebookProfilePicture(token)
            const newUser = await createUser({email, name, avatar: picture})
            const generatedToken = await createNewAuth({email, user: newUser._id})
            res.setHeader('Set-Cookie', serialize('token', generatedToken, {
                httpOnly: true,
                secure: true,
                sameSite: true,
                maxAge: 3600 * 24,
                path: '/'
            }))
            return res.status(200).json({code: 200, payload: {user: newUser, token: generatedToken}})
        }
        const generatedToken = generateToken(user.email, user._id)
        res.setHeader('Set-Cookie', serialize('token', generatedToken, {
            httpOnly: true,
            secure: true,
            sameSite: true,
            maxAge: 3600 * 24,
            path: '/'
        }))
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
