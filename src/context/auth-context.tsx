import React, { ReactNode, useEffect, useState } from 'react'
import * as auth from 'auth-provider'
import { User } from 'screens/project-list/SearchPanel'
import { http } from 'utils/http'
import { useAsync } from 'utils/useAsync'
import { FullPageErrorFallback, FullPageLoading } from 'components/lib'

interface AuthForm {
	username: string,
	password: string
}

const bootstrapUser = async () => {
	let user = null
	const token = auth.getToken
	if (token) {
		const data = await http('me', { token })
		user = data.user
	}
	return user
}

const AuthContext = React.createContext<{
	user: User | null,
	login: (form: AuthForm) => Promise<void>
	register: (form: AuthForm) => Promise<void>
	logout: () => Promise<void>
} | undefined>(undefined)


export const AuthProvider = ({ children }: { children: ReactNode }) => {
	// const [user, setUser] = useState<User | null>(null)
	const {
		data: user, error, isLoading, isIdle, isError, run, setData: setUser
	} = useAsync<User | null>()

	//point free 
	const login = (form: AuthForm) => auth.login(form).then(setUser)
	const register = (form: AuthForm) => auth.register(form).then(setUser)
	const logout = () => auth.logout().then(() => setUser(null))

	useEffect(() => {
		run(bootstrapUser())
	}, [])

	if (isIdle || isLoading) {
		return <FullPageLoading />
	}

	if (isError) {
		return <FullPageErrorFallback error={error} />
	}

	return <AuthContext.Provider children={children} value={{ user, login, register, logout }} />
}

export const useAuth = () => {
	const context = React.useContext(AuthContext)
	if (!context) {
		throw new Error('useAuth必须在AuthProvider中使用')
	}
	return context
}