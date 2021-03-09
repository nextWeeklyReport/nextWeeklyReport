import styled from "styled-components";
export const Input = styled.input`
  padding:10px;
  box-sizing: border-box;//其他浏览器
-webkit-box-sizing: border-box;//谷歌
 -moz-box-sizing: border-box;//火狐
  width:100%;
  background:#f9fafa;
  border-radius:5px;
  border:solid 1px #b5bdc4;
  margin:10px auto;
  &:hover{
    border-color:#99a3ad;
  }
`