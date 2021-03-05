import Link from 'next/link'
import Layout from '../components/Layout'
import { useEffect, useState } from 'react';
import { Md5 } from 'ts-md5/dist/md5';
import { Input } from '../components/Input'
import Btn from '../components/Btn'
import { Pan } from '../components/Pan'

const CreatePage = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [msgText, setMsgText] = useState("")
  const [regSuccess, setRegSuccess] = useState(false)
  const canreg = async () => {
    if (username.length == 0) {
      setMsgText('USERNAME MAST INPUT')
    } else {
      setMsgText("")
      const rawResponse = await fetch(`/api/user/canreg`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username })
      });
      if (rawResponse.ok) {
        setMsgText('can reg')
      } else {
        setMsgText('can not reg')
      }
    }
  }
  const create = async () => {
    if (username.length == 0) {
      setMsgText('USERNAME MAST INPUT')
    } else if (password.length == 0) {
      setMsgText('PASSWORD MAST INPUT')
    } else {
      setMsgText("")
      const md5_pwd = Md5.hashStr(password)
      const rawResponse = await fetch(`/api/user/reg`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, md5_pwd })
      });
      if (rawResponse.ok) {
        setRegSuccess(true)
        setMsgText('create user success !')
      } else {
        setMsgText('create user fail')
      }
    }
  }
  useEffect(() => {
    canreg()
  }, [username])
  return (
    <Layout title="Create">
      <h1>Create</h1>
      <p>{msgText}</p>
      {
        regSuccess && <div>
          <p><Link href="/login">click here to login</Link></p>
        </div>
      }
      {
        !regSuccess && <Pan><Input type="text" defaultValue={username} onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
          setUsername(e.target.value);
        }} /><Input type="password" defaultValue={password} onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
          }} />
          <Btn onClick={create}>create</Btn>
        </Pan>
      }
    </Layout>
  )
}
export default CreatePage
