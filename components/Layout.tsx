import React, { ReactNode, useEffect, useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import cookieCutter from 'cookie-cutter'
import styled from "styled-components";
import { useRouter } from 'next/router';
import { getymd, getWeekNumber } from '../utils/week'

type Props = {
  children?: ReactNode
  title?: string
}

const Div = styled.div`
  background:#eef0f1;
`

const Nav = styled.div`
  display:inline-block;
  margin-left: auto;
  margin-right:0.5rem;
  a{
    color:#323ebe;
    background:rgba(0,0,0,0);
    text-decoration: none;
    box-shadow:rgba(0,0,0,0.05);
    border-radius:4px;
    padding:5px;
  }
  a:hover{
    background:rgba(0,0,0,0.04);
  }
  cursor: pointer;
`;

const Navbar = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  height:56px;
  background:#fff;
  box-shadow: 0 1px 1px rgba(0,0,0,0.1);
  z-index: 999;
`

const NavBox = styled.div`
  width:90%;
  max-width: 1000;
  padding: 0 10px;
  margin: auto;
  display: flex;
  align-items: center;
  position: relative;
  height:56px;
`

const Navs = styled.div`
display: flex;
margin-left: auto;
align-items: center;
text-decoration:none;
`

const Full = styled.div`
  display:block;
  width:100%;
  padding-top: 66px;
`

const Box = styled.div`
  width:90%;
  max-width: 1000;
  padding: 10px;
  margin: 0px auto;
  display: flex;
  align-items: center;
  position: relative;
  flex-direction: column;
  background:#fff;
  border-radius: 10px;
`

const Logo = styled.div`
  display: inline-flex;
  flex-shrink: 0;
  align-self: stretch; 
  align-items: center;
  vertical-align: middle;
  cursor: pointer;
`

const Footer = styled.div`
  position: relative;
  background:#d2d6db
`

const FooterContainer = styled.div`
  max-width:768px;
  margin:10px auto;
  text-align: center;
  padding:20px 0 20px 0;
  p{
    margin:10px auto;
  }
`

//from dev.to
const Pet = styled.img`
  position: absolute;
  right:100px;
  top: -2px;
  transform-origin: center top;
  transition-time: 500ms;
  &:hover{
    transform: rotate(5deg)
  }
`

const Layout = ({ children, title = 'This is the default title' }: Props) => {
  const [username, setUsername] = useState("")
  const router = useRouter()
  const write = () => {
    const username = cookieCutter.get('username')
    if (username) {
      const { y, m, d } = getymd();
      const w = getWeekNumber(y, m, d)
      router.push(`/edit/${username}/${y}/${w}`)
    }
  }
  useEffect(() => {
    const ua = cookieCutter.get('username')
    if (ua) {
      setUsername(ua)
    }
  }, [])
  return (
    <Div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="stylesheet" media="all" href="/css/style.css" />
      </Head>
      <Navbar>
        <NavBox>
          <Logo><Link href="/"><img width="30" height="30" src="/images/logo.svg" /></Link></Logo>
          <Navs>
            <Nav><Link href="/">Home</Link></Nav>
            <Nav><Link href="/users">Users List</Link></Nav>
            {
              username != "" &&
              <Nav><Link href={`/${username}`}>{username}</Link></Nav>
            }
            {
              username != "" &&
              <Nav><a onClick={write}>Write</a></Nav>
            }
            {
              username != "" &&
              <Nav><Link href="/logout">Logout</Link></Nav>
            }
            {
              username == "" &&
              <Nav><Link href="/login">Login</Link></Nav>
            }
            {
              username == "" &&
              <Nav><Link href="/create">Create a user</Link></Nav>
            }
          </Navs>
        </NavBox>
      </Navbar>
      <Full>
        <Box>{children}</Box>
      </Full>
      <Footer>
        <FooterContainer>
          <p>Open Source · Free Forever</p>
          <p>We strive for transparency and don't collect excess data.</p>
          <p>Made with ❤️ and Next.js weeklyReport © 2020 - 2021. </p>
          <p><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" role="img" aria-labelledby="aau6iayxddi2winecd3vosw06t5ke26p" className="crayons-icon crayons-icon--default"><title id="aau6iayxddi2winecd3vosw06t5ke26p">Forem logo</title>
            <g clipPath="url(#clip0)" fill="#1AB3A6">
              <path d="M4.603 1.438a8.056 8.056 0 017.643 5.478 8.543 8.543 0 00-3.023 5.968H8.054C3.606 12.884 0 9.296 0 4.87V1.468a.03.03 0 01.03-.03h4.573zM23.97 6.515a.03.03 0 01.03.03v2.833c0 4.11-3.354 7.442-7.491 7.442h-2.881v5.726h-2.305V14.53l.022-1.145c.294-3.843 3.526-6.87 7.469-6.87h5.155z"></path>
            </g>
            <defs>
              <clipPath id="clip0">
                <path fill="#fff" d="M0 0h24v24H0z"></path>
              </clipPath>
            </defs>
          </svg>&nbsp;&nbsp;<a href="https://github.com/nextweeklyreport" target="_blank">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" role="img" aria-labelledby="ajp28s5txm7y7iik1vi1zel71kygu2jc" className="crayons-icon"><title id="ajp28s5txm7y7iik1vi1zel71kygu2jc">Github</title>
                <path d="M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 006.838 9.488c.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.288-.6-1.175-1.025-1.413-.35-.187-.85-.65-.013-.662.788-.013 1.35.725 1.538 1.025.9 1.512 2.338 1.087 2.912.825.088-.65.35-1.087.638-1.337-2.225-.25-4.55-1.113-4.55-4.938 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.275.1-2.65 0 0 .837-.262 2.75 1.026a9.28 9.28 0 012.5-.338c.85 0 1.7.112 2.5.337 1.912-1.3 2.75-1.024 2.75-1.024.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.687 0 3.838-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.188.574.688.474A10.016 10.016 0 0022 12c0-5.525-4.475-10-10-10z"></path>
              </svg>
            </a></p>
        </FooterContainer>
        <Pet width="52" height="120" src="/images/pet.png" />
      </Footer>
    </Div>
  )
}
export default Layout
