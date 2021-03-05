import React, { FunctionComponent, ReactNode, useEffect, useState } from 'react'
import styled from "styled-components";

const B = styled.button`
  margin-top:10px;
  text-align:center;
  border-rails:10px;
  line-height: 1.75;
  border-radius: 4px;
  border:1px;
  font-weight: 500;
  letter-spacing: 0.02857em;
  text-transform: uppercase;
  display: inline-flex;
  outline: 0;
  padding: 6px 16px;
  font-size: 0.875rem;
  min-width: 64px;
  background:#3b49df;
  color:#fff;
  cursor: pointer;
  justify-content: center;
  &:hover{
    background:#323ebe;
  }
`;

type Props = {
  children?: ReactNode,
  onClick?: Function
}

const Btn = ({ children, onClick }: Props) => {
  useEffect(() => {
  }, [])
  return (
    <B onClick={() => {
      onClick?.()
    }}>{children}</B>
  )
}
export default Btn
