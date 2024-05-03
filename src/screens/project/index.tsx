import React from "react";
import { Link, Navigate } from "react-router-dom"
import { Routes, Route, } from 'react-router';
import { EpicScreen } from "screens/epic"
import { KanbanScreen } from "screens/kanban"

export const ProjectScreen = () => {
	return <div>
		<h1>ProjectScreen</h1>
		<Link to={'kanban'}>看板</Link>
		<Link to={'epic'}>任务组</Link>
		<Routes>
			<Route index element={<KanbanScreen />} />
			<Route path={'/kanban'} element={<KanbanScreen />}></Route>
			<Route path={'/epic'} element={<EpicScreen />}></Route>
			{/* <Navigate to={window.location.pathname + '/kanban'} replace={true} /> */}
			{/* {Navigate(
				{ to: window.location.pathname + '/kanban' }
			)} */}
		</Routes>
		{/* <Navigate to={'/'} /> */}
	</div>
}