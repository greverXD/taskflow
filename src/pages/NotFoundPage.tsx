import { Link } from "react-router"

function NotFoundPage(){
    return(
        <div>
        <h2>Страница не найдена</h2>
        <Link to="/">на главную</Link>
        </div>
    )
}
export default NotFoundPage