// import { User } from '../interfaces'
import Layout from '../components/Layout'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import ReportList from '../components/ReportList'
import Pages from '../components/Pages'
import { PageNav } from '../utils/pagenav'
import cookieCutter from 'cookie-cutter'
import Link from 'next/link'
const User = () => {
  const router = useRouter()
  const { username } = router.query
  console.log(username)
  const [am, setAm] = useState(false)
  const [list, setList] = useState([])
  const [pages, setPages] = useState<number[]>([])
  const [pagenum, setPagenum] = useState(1)
  const [empty, setEmpty] = useState(false)
  const getlist = async (pagenum: number) => {
    console.log(username);
    const rawResponse = await fetch(`/api/user/${username}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ page: pagenum, size: 10 })
    });
    const json = await rawResponse.json();
    const { list, size, total, page } = json;
    console.log(json)
    setList(list)
    if (total == 0) {
      setEmpty(true)
    }
    setPages(PageNav(size, total, page))
  }
  useEffect(() => {
    if (cookieCutter.get('username') == username) {
      setAm(true)
    }
    if (username) {
      getlist(pagenum)
    }
  }, [username])

  const nav = async (page: number) => {
    console.log('nav', page)
    setPagenum(page)
    getlist(page)
  }

  return (
    <Layout
      title={username ? username : ''}
    >
      <h2>{username}</h2>
      {
        list && <ReportList items={list} />
      }
      {
        empty && <div>
          <p>{username} 还没有写周报</p>
        </div>
      }

      <Pages items={pages} current={pagenum} onchange={nav} />
    </Layout>
  )
}

export default User

