import { useMemo } from "react"
import { useHttp } from "utils/http"
import { useUrlQueryParam } from "utils/url"
import { useAsync } from "utils/useAsync"
import { Project } from "./List"

export const useProjectSearchParams = () => {
    const [param, setParam] = useUrlQueryParam(["name", "personId"])
    return [
        useMemo(
            () => ({ ...param, personId: Number(param.personId) || undefined })
            , [param]
        ),
        setParam
    ] as const
}

export const useEditProjectPin = ()=>{
  const client = useHttp()
  const {run,...asyncResult} = useAsync()
  const mutate = (params: Partial<Project>)=>{
    return run(client(`projects/${params.id}`, {
      data:params,
      method:'PATCH'
    }))
  }
  return {
    mutate,
    ...asyncResult
  }
}

export const useAddProjectPin = ()=>{
  const client = useHttp()
  const {run,...asyncResult} = useAsync()
  const mutate = (params: Partial<Project>)=>{
    return run(client(`projects/${params.id}`, {
      data:params,
      method:'POST'
    }))
  }
  return {
    mutate,
    ...asyncResult
  }
}