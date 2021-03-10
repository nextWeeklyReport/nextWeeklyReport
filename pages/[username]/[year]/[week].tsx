// import { User } from '../interfaces'
import Layout from '../../../components/Layout'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getformto } from '../../../utils/week'
import Editor from "rich-markdown-editor";
const WeeklyRePort = () => {
    const router = useRouter()
    const { username, year, week } = router.query
    const [md, setMD] = useState("");
    const [weeks, setWeeks] = useState<any>({})
    const [isEmpty, setIsEmpty] = useState<boolean>(false)
    const get = async () => {
        console.log(username, year, week)
        if (username && year && week) {
            const rawResponse = await fetch(`/api/report`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, year, week })
            });
            const json = await rawResponse.json();
            const { text } = json
            if (text) {
                setMD(text)
            } else {
                setIsEmpty(true)
                console.log('null')
            }
        }
    }
    useEffect(() => {
        get()
        const { from, to } = getformto(parseInt(year + ''), parseInt(week + ''))
        setWeeks({ from, to })
    }, [username, year, week])

    return (
        <Layout
            title={username ? username as string : ''}
        >
            <h1>{username}</h1>
            <h2>{year}年 第 {week} 周</h2>
            <p>{weeks?.from?.m}月{weeks?.from?.d}日 ~ {weeks?.to?.m}月{weeks?.to?.d}日</p>
            {
                isEmpty && <div>Empty</div>
            }
            {
                !isEmpty && <Editor value={md} onChange={()=>{}} readOnly={true} />
            }
            <a href={`/edit/${username}/${year}/${week}`}>edit</a>
        </Layout>
    )
}

export default WeeklyRePort