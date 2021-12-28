import { useEffect } from "react"
import { Project } from "screens/project-list/List"
import { User } from "screens/project-list/SearchPanel"
import { cleanObject } from "utils"
import { useHttp } from "./http"
import { useAsync } from "./useAsync"

export const useUser = (param?: Partial<User>) => {
    const client = useHttp()
    const { run, ...result } = useAsync<User[]>()

    useEffect(() => {
        run(client('users', { data: cleanObject(param || {}) }))
    }, [])
    return result
}