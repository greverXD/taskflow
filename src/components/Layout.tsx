import { Link,Outlet } from "react-router";
import { useVolume } from "../TaskContext";
function Layout(){
    const { toggleDark, color } = useVolume();
    return(
      
    <div className={color ? "board_white" : "board_dark"}>
      <h1 className={color ? "h_white" : "h_dark"}>TaskFlow</h1>
      <nav>
        <Link to="/"> Доска</Link>
        <Link to="/about">О проекте</Link>
      </nav>
      <Outlet/>
      <button onClick={toggleDark}>Переключить тему</button>
    </div>
  
)
}
export default Layout;