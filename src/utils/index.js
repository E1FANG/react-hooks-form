import { useEffect, useState } from "react"

export const isFalsy = (value) => value === 0 ? false : !value

// 不要改变函数的入参
export const cleanObject = (object) => {
    const result = { ...object }
    Object.keys(result).forEach(key => {
        const val = result[key]
        if (isFalsy(val)) {
            delete result[key]
        }
    })
    return result
}

export const useDebounce = (value, delay) => {
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