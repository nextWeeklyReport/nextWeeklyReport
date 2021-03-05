import { NextApiRequest, NextApiResponse } from 'next'
import { getUserList } from '../../../utils/db'

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
    switch (_req.method) {
        case 'POST':
            const { page, size } = _req.body;
            try {
                const rs = await getUserList(page, size)
                res.status(200).json(rs)
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