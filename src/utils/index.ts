import { useEffect, useRef, useState } from "react"

export const isFalsy = (value: unknown) => value === 0 ? false : !value

export const isVoid = (value: unknown) => value === undefined || value === null || value === ''

// 不要改变函数的入参
export const cleanObject = (object: { [key: string]: unknown }) => {
  const result = { ...object }
  Object.keys(result).forEach(key => {
    // @ts-ignore
    const val = result[key]
    if (isVoid(val)) {
      // @ts-ignore
      delete result[key]
    }
  })
  return result
}

export const useDebounce = (value: any, delay?: number) => {
  const [debounceValue, setDebounceValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(
      () => setDebounceValue(value), delay
    )
    return () => {
      clearInterval(timer)
    }
  }, [value, delay])

  return debounceValue
}

export const useDocumentTitle = (title: string, keepOnUnmount = false) => {
  const oldTitle = useRef(document.title).current

  useEffect(() => {
    document.title = title
  }, [title])

  useEffect(() => {
    return () => {
      if (keepOnUnmount) {
        document.title = oldTitle
      }
    }
  }, [oldTitle, keepOnUnmount])
}

export const resetRoute = () => {
  window.location.href = window.location.origin
}