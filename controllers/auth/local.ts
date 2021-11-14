import {NextApiRequest, NextApiResponse} from "next";
import {Response} from "@common/api/response";
import logger from "@utils/logger";
import jwt from "jsonwebtoken";
import LocalToken from "@common/api/token";
import {verifyTokenAndFindUser} from "@services/auth";

export default async (req: NextApiRequest,
                      res: NextApiResponse<Response>) => {
    if (!process.env.TOKEN_SECRET) {
        logger.error(new Error('TOKEN SECRET NOT FOUND!'))
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
