import { useState } from "react"

export const useArray = <T>(initialValue: T[]) => {
    const [value, setValue] = useState(initialValue)
    const add = (item: T) => {
        setValue([...value, item])
    }
    const clear = () => {
        setValue([])
    }
    const deleteIndex = (index: number) => {
        const copy = [...value]
        console.log(11111, copy);
        copy.splice(index, 1)

        setValue(copy)
    }
    return {
        value,
        setValue,
        add,
        clear,
        deleteIndex
    }
}
