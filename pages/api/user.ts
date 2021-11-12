import type { NextApiRequest, NextApiResponse } from 'next'
import connectMongoDB from "@lib/connectMongoDB";

type Data = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    await connectMongoDB()
    return res.status(200).json({ name: 'John Doe' })
}
