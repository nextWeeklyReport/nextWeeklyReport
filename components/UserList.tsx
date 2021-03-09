import * as React from 'react'
import { User } from '../interfaces'
import Link from 'next/link'
import Avatar from 'react-avatar';
import styled from "styled-components";

const Div = styled.div`
  margin:10px;
`;
type Props = {
  items: User[]
}

const UserList = ({ items }: Props) => (
  <div>
    {
      items.map((item) => (
        <Div key={item._id}>
          <Link href={`/${item.username}`}>
            <a><Avatar size={'50'} round="50%" name={item.username} />&nbsp;&nbsp;{item.username}</a>
          </Link>
        </Div>
      ))
    }
  </div>
)

export default UserList
