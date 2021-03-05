import { NextApiRequest, NextApiResponse } from 'next'
import { getWeeklyReport, updateWeeklyReport } from '../../../utils/db'
import Cookies from 'cookies'
const jwt = require('jsonwebtoken');
const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
    switch (_req.method) {
        case 'PUT':
            try {
                const cookies = new Cookies(_req, res)
                const token = cookies.get('token')
                console.log('token', token)
                const decoded = jwt.verify(token, 'codetyphon');
                console.log('decoded', decoded.username, decoded.iat)
                const { username, year, week, text } = _req.body;
                if (username == decoded.username) {
                    const rs = await updateWeeklyReport(username, parseInt(year), parseInt(week), text)
                    res.status(200).json(rs)
                } else {
                    res.status(403).send("403")
                }
            } catch (err) {
                res.status(500).send(err.message)
            }
            break;
        case 'POST':
            try {
                const { username, year, week } = _req.body;
                const rs = await getWeeklyReport(username, parseInt(year), parseInt(week))
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