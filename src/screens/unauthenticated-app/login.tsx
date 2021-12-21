import { Button, Form, Input } from "antd";
import { useAuth } from "context/auth-context";
import React from "react";



export const LoginScreen = () => {
	const { login, user } = useAuth()
	const handleSubmit = (values: { username: string, password: string }) => {
		login(values)
	}

	return (
		<>
			<Form onFinish={handleSubmit}>
				<Form.Item name={'username'} rules={[{ required: true, message: '请输入用户名' }]}>
					<Input placeholder={'用户名'} type="text" id={'username'}></Input>
				</Form.Item>
				<Form.Item name={'password'} rules={[{ required: true, message: '请输入密码' }]}>
					<Input placeholder={'密码'} type="password" id={'password'}></Input>
				</Form.Item>
				<Form.Item>
					<Button type="primary">登陆</Button>
				</Form.Item>
			</Form >
		</>
	)
}