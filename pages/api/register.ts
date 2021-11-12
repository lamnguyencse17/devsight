import {NextApiRequest, NextApiResponse} from "next";
import {registerUserSchema} from "@validators/user";
import connectMongoDB from "@lib/connectMongoDB";
import {createUser} from "@services/user";
import logger from "@utils/logger";
import {Response} from "@common/api/response";
import {createNewAuth} from "@services/auth";
import {serialize} from "cookie";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Response>
) {
    try {
        const {name, email, password} = await registerUserSchema.validate(req.body)
        await connectMongoDB()
        const avatar = `https://ui-avatars.com/api/?name=${name}`
        const newUser = await createUser({name, email, avatar})
        const token = await createNewAuth({email, password, user: newUser._id})
        res.setHeader('Set-Cookie', serialize('token', token, {httpOnly: true, secure: true, sameSite: true, maxAge: 3600*24, path: '/'}))
        return res.status(200).json({code: 200, payload: {user: newUser, token}})
    } catch (err) {
        logger.info(err)
        if (err instanceof Error){
            return res.status(200).json({code: 400, message: err.message})
        }
        return res.status(500).json({code: 500, message: "Service is not available"})
    }
}
