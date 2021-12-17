import React from 'react'
import { useEffect, useState } from "react"
export const SearchPanel = ({ param, setParam, users }) => {


	return (
		<form>
			<input type="text"
				value={param.name}
				onChange={(evt) => setParam({
					...param,
					name: evt.target.value
				})}
			/>
			<select
				value={param.id}
				onChange={evt => setParam({
					...param,
					personId: evt.target.value
				})}
			>
				<option value="">负责人</option>
				{
					users.map(user => (
						<option key={user.id} value={user.id}>{user.name}</option>
					))
				}
			</select>
		</form>
	)
}