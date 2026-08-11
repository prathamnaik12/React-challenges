import { useEffect, useState } from 'react'

export function useLocalStorage<T>(
    key: string,
    initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
    const [value, setValue] = useState<T>(() => {
        try {
            const savedValue = localStorage.getItem(key)

            if (savedValue !== null) {
                return JSON.parse(savedValue) as T
            }

            return initialValue
        } catch {
            return initialValue
        }
    })

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value))
        } catch {
            // Ignore localStorage errors
        }
    }, [key, value])

    const setStoredValue = (newValue: T | ((prev: T) => T)) => {
        setValue(newValue)
    }

    return [value, setStoredValue]
}