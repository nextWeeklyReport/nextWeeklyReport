import { NextApiRequest, NextApiResponse } from 'next'
import { getJwt } from '../../../utils/db'
import Cookies from 'cookies'

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
    switch (_req.method) {
        case 'POST':
            try {
                const { username, md5_pwd } = _req.body;
                const { err, token } = await getJwt(username, md5_pwd)
                console.log(err, token)
                if (err) {
                    res.status(500).json("login fail")
                } else {
                    const cookies = new Cookies(_req, res)
                    cookies.set('token', token);
                    cookies.set('username', username, {
                        httpOnly: false
                    })
                    res.status(200).json(true)
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