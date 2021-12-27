import { Table } from 'antd'
import dayjs from 'dayjs'
import React from 'react'
import { User } from './SearchPanel'

interface Project {
  id: string
  name: string
  personId: string
  pin: boolean
  organization: string
  created: number
}

interface ListProps {
  list: Project[]
  users: User[]
}

export const List = ({ list, users }: ListProps) => {
  return <Table pagination={false} columns={[
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name)
    },
    {
      title: '部门',
      dataIndex: 'organization',
      key: 'organization',
    },
    {
      title: '负责人',
      key: 'personId',
      render(value, project) {
        return <span>
          {users.find(user => user.id === project.id)?.name || '未知'}
        </span>
      }
    },
    {
      title: '创建时间',
      key: 'created',
      render(value, project) {
        return <span>
          {project.created ? dayjs(project.created).format('YYYY-MM-DD') : ' - '}
        </span>
      }
    }
  ]} dataSource={list}>
  </Table>
}