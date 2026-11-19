import { NavLink,Outlet } from "react-router";
import { useThemeStore } from "../stores/useThemeStore";

function Layout(){

    // const { toggleDark, color } = useVolume();
    const isDark = useThemeStore((state)=> state.isDark)
    const toggleDark = useThemeStore((state)=> state.toggleTheme)
    return(
      
    <div className={isDark ?  "board_dark": "board_white"}>
      <h1 className={isDark ?  "h_dark": "h_white"}>TaskFlow</h1>
      <nav>
        <NavLink to="/">Мои Доски</NavLink>
        <NavLink to="/about">О проекте</NavLink>
      </nav>
      <Outlet/>
      <button onClick={toggleDark}>Переключить тему</button>
    </div>
  
)
}
export default Layout;