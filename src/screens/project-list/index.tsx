import React from 'react'
import { List } from "./List"
import { SearchPanel } from "./SearchPanel"
import { useState, useEffect } from "react"
import { cleanObject, useDebounce } from 'utils/index'
import * as qs from 'qs'

const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const [list, setList] = useState([])
  const [users, setUsers] = useState([])
  const debounceValue = useDebounce(param, 500)

  useEffect(() => {
    fetch(`${apiUrl}/users`).then(async res => {
      res.ok && setUsers(await res.json())
    })
  }, [])

  useEffect(() => {
    fetch(`${apiUrl}/project?${qs.stringify(cleanObject(debounceValue))}`).then(async res => {
      res.ok && setList(await res.json())
    })
  }, [debounceValue])


  return <div>
    <SearchPanel users={users} param={param} setParam={setParam} ></SearchPanel>
    <List users={users} list={list}></List>
  </div>
}