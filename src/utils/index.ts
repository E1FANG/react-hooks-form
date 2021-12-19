import { useEffect, useState } from "react"

export const isFalsy = (value: any) => value === 0 ? false : !value

// 不要改变函数的入参
export const cleanObject = (object: object) => {
    const result = { ...object }
    Object.keys(result).forEach(key => {
        // @ts-ignore
        const val = result[key]
        if (isFalsy(val)) {
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


// 什么时候会执行useEffect
// setState会触发什么