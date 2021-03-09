import Link from 'next/link'
import Layout from '../components/Layout'
import { useEffect, useState } from 'react';
import { Md5 } from 'ts-md5/dist/md5';
import { Input } from '../components/Input'
import { Pan } from '../components/Pan'
import Btn from '../components/Btn'

const LoginPage = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [msgText, setMsgText] = useState("")
  const [loginSuccess, setLoginSuccess] = useState(false)
  const login = async () => {
    if (username.length == 0) {
      setMsgText('USERNAME MAST INPUT')
    } else if (password.length == 0) {
      setMsgText('PASSWORD MAST INPUT')
    } else {
      setMsgText("")
      console.log(username, password)
      const md5_pwd = Md5.hashStr(password)
      const rawResponse = await fetch(`/api/user/login`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, md5_pwd })
      });
      if (rawResponse.ok) {
        setLoginSuccess(true)
        setMsgText('login success !')
        console.log('login success!')
      } else {
        console.log('login fail')
        setMsgText('login fail !')
      }
    }
  }
  useEffect(() => {

  }, [])
  return (
    <Layout title="Login">
      <h1>Login</h1>
      <p>{msgText}</p>
      {
        loginSuccess && <div>
          <p><Link href="/">click here to back home</Link></p>
        </div>
      }
      {
        !loginSuccess && <Pan><Input type="text" defaultValue={username} onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
          setUsername(e.target.value);
        }} />
        <Input type="password" defaultValue={password} onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
          }} />
          <Btn onClick={login}>login</Btn>
        </Pan>
      }
    </Layout >
  )
}
export default LoginPage
