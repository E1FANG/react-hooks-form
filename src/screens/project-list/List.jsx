import React from 'react'
export const List = ({ list, users }) => {
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