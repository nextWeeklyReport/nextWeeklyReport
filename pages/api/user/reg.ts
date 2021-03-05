import { NextApiRequest, NextApiResponse } from 'next'
import { reg } from '../../../utils/db'

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
    switch (_req.method) {
        case 'POST':
            try {
                const { username, md5_pwd } = _req.body;
                const flag = await reg(username, md5_pwd)
                if (flag) {
                    res.status(200).send("reg ok")
                } else {
                    res.status(500).send("reg fail")
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