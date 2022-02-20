import {Dispatch, useEffect, useState} from 'react';

export const useDebounce = <V = any>(callback: any, value: V, timeout = 1000): [V, Dispatch<V>] => {
    const [debouncedValue, setDebouncedValue] = useState<V>(value);
    useEffect(() => {
        let timerId = setTimeout(callback, timeout)
        return () => {
            clearTimeout(timerId)
        }
    }, [debouncedValue])

    return [debouncedValue, setDebouncedValue]
}