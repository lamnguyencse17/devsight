import {NextApiRequest, NextApiResponse} from 'next';
import connectMongoDB from '@lib/connectMongoDB';
import {Response} from '@common/api/response';
import logger from '@utils/logger';
import {handleFacebookAuth, handleGoogleAuth, handleLocalAuth} from '@controllers/auth'


if (!process.env.GOOGLE_CLIENT_ID) {
    logger.error('NO GOOGLE CLIENT ID PROVIDED')
    throw new Error('NO GOOGLE CLIENT ID PROVIDED')
}

const LOCAL_AUTH = 'local'
const GOOGLE_AUTH = 'google'
const FACEBOOK_AUTH = 'facebook'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Response>
) {
    const {authType} = req.query;
    try {
        await connectMongoDB()
        switch (authType) {
            case LOCAL_AUTH: {
                await handleLocalAuth(req, res)
                return
            }
            case GOOGLE_AUTH: {
                await handleGoogleAuth(req, res)
                return;
            }
            case FACEBOOK_AUTH: {
                await handleFacebookAuth(req, res)
                return;
            }
            default: {
                return res.status(200).json({code: 401, message: 'Auth type is not supported'})
            }
        }
    } catch (err) {
        logger.error(err)
        return res.status(500).json({code: 500, message: 'Service is not available'})
    }

}
