import {Link} from "react-router-dom";
import DigestaTocDesktopOpus from "../DigestaTocDesktopOpus/DigestaTocDesktopOpus";


const DigestaTocDesktopOpera = ({toc}) => {

    return (
        <>
            <label>Wybierz pracę</label>
            <ul>
                {toc.map((opus)=>(<DigestaTocDesktopOpus key={opus.id} opus={opus}/>))}

            </ul>

        </>
    )
}

export default DigestaTocDesktopOpera