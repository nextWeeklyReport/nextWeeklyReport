import { NextApiRequest, NextApiResponse } from 'next'
import { getWeeklyListByUser } from '../../../utils/db'

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
    const {
        query: { username },
        method,
    } = _req

    switch (method) {
        case 'POST':
            try {
                if (typeof username === "string") {
                    const { page, size } = _req.body;
                    const rs = await getWeeklyListByUser(username, page, size)
                    res.status(200).json(rs)
                }
            } catch (err) {
                res.status(500).json({ statusCode: 500, message: err.message })
            }
            break
        default:
            res.status(405).end() //Method Not Allowed
            break
    }
}

export default handler