import React from 'react'
import { List } from "./List"
import { SearchPanel } from "./SearchPanel"
import { useState, useEffect } from "react"
import { cleanObject, useDebounce } from 'utils/index'
import { useHttp } from 'utils/http'
import { Button } from 'antd'
import styled from '@emotion/styled'



export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const client = useHttp()
  const [list, setList] = useState([])
  const [users, setUsers] = useState([])
  const debounceValue = useDebounce(param, 500)
  useEffect(() => {
    client('users').then(setUsers)
  }, [])
  useEffect(() => {
    client('project', { data: cleanObject(debounceValue) }).then(setList)
  }, [debounceValue])


  // useEffect(() => {
  //   fetch(`${apiUrl}/project?${qs.stringify(cleanObject(debounceValue))}`).then(async res => {
  //     res.ok && setList(await res.json())
  //   })
  // }, [debounceValue])


  return <Container>
    <h1>项目列表</h1>
    <SearchPanel users={users} param={param} setParam={setParam} ></SearchPanel>
    <List users={users} list={list}></List>
  </Container>
}
const Container = styled.div`
padding: 3.2rem;
`