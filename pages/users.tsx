import Layout from '../components/Layout'
import UserList from '../components/UserList'
import { useEffect, useState } from 'react'

const Page = () => {
  const [list,setList]=useState([])
  const getlist = async () => {
    const rawResponse = await fetch('/api/user/list', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ page: 1, size: 10 })
    });
    const json = await rawResponse.json();
    const { list } = json;
    console.log(list);
    setList(list)
  }
  useEffect(() => {
    getlist()
  }, [])
  return (
    <Layout title="Users List">
      <h1>Users List</h1>
      {
        list &&<UserList items={list} />
      }
    </Layout>
  )
}
export default Page
