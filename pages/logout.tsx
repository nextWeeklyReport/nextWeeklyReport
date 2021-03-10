import Link from 'next/link'
import Layout from '../components/Layout'
import cookie from 'react-cookies'
import { useEffect } from 'react';

const LogoutPage = () => {
    useEffect(() => {
        cookie.remove('token', { path: '/' })
        cookie.remove('username', { path: '/' })
        // cookieCutter.set('token', '', { expires: new Date(0) })
        // cookieCutter.set('username', '', { expires: new Date(0) })
    }, [])
    return (
        <Layout title="Logout">
            <h1>logout</h1>
            <p>logout ok</p>
            <p>
                <Link href="/">
                    <a>Go home</a>
                </Link>
            </p>
        </Layout>
    )
}
export default LogoutPage
