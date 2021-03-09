import * as React from 'react'
import { Report } from '../interfaces'
import Link from 'next/link'
type Props = {
    items: Report[]
}

const ReportList = ({ items }: Props) => (
    <ul>
        {items.map((item) => (
            <li key={item._id}>
                <Link href={`/${item.username}/${item.year}/${item.week}`}>
                    <a>{item.year} 年第 {item.week} 周</a>
                </Link>
            </li>
        ))}
    </ul>
)

export default ReportList
