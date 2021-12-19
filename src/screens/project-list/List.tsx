import React from 'react'
import { User } from './SearchPanel'

interface Project {
	id: string
	name: string
	personId: string
	pin: boolean
	organization: string
}

interface ListProps {
	list: Project[]
	users: User[]
}

export const List = ({ list, users }: ListProps) => {
	return <table>
		<thead>
			<tr>
				<th>名称</th>
				<th>负责人</th>
			</tr>
		</thead>
		<tbody>
			{
				list.map(preject => <tr key={preject.id}>
					<td>{preject.name}</td>
					<td>
						{users.find(user => user.id === preject.id)?.name || '未知'}
					</td>
				</tr>)
			}
		</tbody>
	</table>
}