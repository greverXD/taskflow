
import {useEffect, useState} from "react"

export function useDebounce<T>(
    search: T,
    time:number
): T{
    const [debouce,setDebounce] = useState<T>(search)
    useEffect(()=>{
        const timer = setTimeout(() => {
            
            setDebounce(search)
        }, time);
        return ()=> clearTimeout(timer)
    },[search,time])
    

    return debouce
}