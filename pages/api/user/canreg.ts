import { NextApiRequest, NextApiResponse } from 'next'
import { canReg } from '../../../utils/db'

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
    switch (_req.method) {
        case 'POST':
            try {
                const { username } = _req.body;
                const flag = await canReg(username)
                if (flag) {
                    res.status(200).send("can reg")
                } else {
                    res.status(500).send("can not reg")
                }
            } catch (err) {
                res.status(500).send(err.message)
            }
            break
        default:
            res.status(405).end() //Method Not Allowed
            break
    }
}

export default handler