import * as React from 'react'
import styled from "styled-components";

// import { Report } from '../interfaces'
// import Link from 'next/link'
type Props = {
    items: number[],
    current: number,
    onchange: Function
}

const Nav = styled.div`
  display:inline-block;
  font-size: 50px;
  color:#ccc;
`;

const NavActive = styled.div`
  display:inline-block;
  font-size: 50px;
  color:#000;
`;

const Pages = ({ items, current, onchange }: Props) => {
    return (
        <div>
            {
                items.map((item: number) => {
                    if (item == current) {
                        return (
                            <NavActive key={item} onClick={() => {
                                onchange(item)
                            }}>{item}</NavActive>
                        )
                    } else {
                        return (
                            <Nav key={item} onClick={() => {
                                onchange(item)
                            }}>{item}</Nav>
                        )
                    }
                })
            }
        </div>
    )

}

export default Pages
