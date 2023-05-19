import {Outlet} from "react-router-dom";


const DigestaStatsJurists = () => {


    return (

        <>
            <h1>Juryśli</h1>

            <div>wykres liniowy z objętością wg wieku Jurysty</div>


            <h4>Chart z jurystami i ich procentowym udziałem</h4>
            <Outlet/>
        </>
    )
}
export default DigestaStatsJurists