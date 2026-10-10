import { useContext, createContext, type ReactNode } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
interface ToggleThemeValue{
    color: boolean
    toggleDark: ()=> void
}
const CreateTask = createContext<ToggleThemeValue| undefined>(undefined)
function ThemeProvider({children}: {children:ReactNode}){


const [color,setColor] = useLocalStorage('keyColor', false)
const toggleDark = () => setColor((prev)=>!prev)
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
