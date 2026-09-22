import { useContext, useState, createContext,useEffect, type ReactNode } from "react";
interface ToggleThemeValue{
    color: boolean
    toggleDark: ()=> void
}
const CreateTask = createContext<ToggleThemeValue| undefined>(undefined)
function ThemeProvider({children}: {children:ReactNode}){
    const key:string = "keyColor"

    

    const [color,useColor] = useState<boolean>(()=>{
        try{
            let taskKey = localStorage.getItem(key)
            if(taskKey === null){
                return false
            } 
            return JSON.parse(taskKey)
            }

            
        
        catch(error){
            console.warn("error",error)
            return false
            }
    }) 


    const toggleDark = () => useColor((prev)=>!prev)
    useEffect(()=>{
  localStorage.setItem(key,JSON.stringify(color))
},[color])
    return(
     <CreateTask.Provider value={{color,toggleDark}}>
        {children}
     </CreateTask.Provider>

    )

}
export function useVolume(){
        const context = useContext(CreateTask)
        if(context === undefined){
            throw new Error("Ошибка")
        }
        return context
    }

export default ThemeProvider; 
