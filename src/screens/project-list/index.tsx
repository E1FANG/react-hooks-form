import React from 'react'
import { List } from "./List"
import { SearchPanel } from "./SearchPanel"
import { useState } from "react"
import { useDebounce, useDocumentTitle } from 'utils/index'
import { Typography } from 'antd'
import styled from '@emotion/styled'
import { useProject } from 'utils/project'
import { useUser } from 'utils/user'



export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })

  useDocumentTitle('项目列表', true)

  const debounceValue = useDebounce(param, 500)

  const { isLoading, error, data: list } = useProject(debounceValue)

  const { data: users } = useUser()

  return <Container>
    <h1>项目列表</h1>
    <SearchPanel users={users || []} param={param} setParam={setParam} ></SearchPanel>
    {error && <Typography.Text type={"danger"}>{error.message}</Typography.Text>}
    <List users={users || []} dataSource={list || []} loading={isLoading} ></List>
  </Container >
}
const Container = styled.div`
padding: 3.2rem;
`