import classes from "./Main.module.css"
import {Link} from "react-router-dom";

const Main = () => {

    return (
        <>
            <main>MAIN tain</main>
            <ul>
                <li>
                    <Link to="digesta">Digesta</Link>
                </li>
                <li>
                    <Link to="jurysci">Juryści</Link>
                </li>
                <li>
                    <Link to="Wyszukaj">Wyszukaj</Link>
                </li>

            </ul>

        </>

    )
}

export default Main