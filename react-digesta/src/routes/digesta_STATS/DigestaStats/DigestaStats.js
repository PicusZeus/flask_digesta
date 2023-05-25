import classes from "./DigestaStats.module.css"
import {Link, Outlet, useNavigate} from "react-router-dom";
import Button from "../../../components/UI/button/Button"
const DigestaStats = () => {

    const navigate = useNavigate()


    const redirectionHandler = (url) => {
        navigate(url)
    }
    return (
        <div className={classes.main}>

            <h1 className={classes.main_title}>Ta część strony poświęcona jest statystykom dotyczącym Digestów i autorów
                oraz ich prac cytowanych w tym
                dziele.</h1>
            <div className={classes.main_info__container}>
                <div>
                    <h2 className={classes.main_subtitle}>Digesta składają się z:</h2>
                    <ul className={classes.main_items}>

                        <li>50 ksiąg</li>
                        <li>432 tytułów</li>
                        <li>9142 ustaw</li>
                        <li>21084 paragrafów</li>


                    </ul>
                </div>
                <div>
                    <h2 className={classes.main_subtitle}>Oryginalny tekst Digestów obejmuje </h2>
                    <h3>(bez tytułów i adresów)</h3>
                    <ul className={classes.main_items}>
                        <li>z 8394355 słów</li>
                        <li>z około 5588000 znaków</li>
                    </ul>
                </div>
                <div>
                    <h2 className={classes.main_subtitle}>Digesta są kompilacją prac wcześniejszej jurysprudencji</h2>
                    <h3>Cytuje się w nich</h3>
                    <ul className={classes.main_items}>
                        <li>54 jurystów</li>
                        <li>384 prace jurystów</li>
                    </ul>
                    <p> Należy jednak nadmienić, że niektóre imiona pomniejszych Jurystów mogą odnosić się do tego
                        samego
                        Jurysty, oraz, co występuje z pewnością częściej, że wiele prac o podobnych tytułach mogą
                        odnosić się do tego
                        samego dzieła. Co więcej wydaje się, że wiele cytowań pochodzi nie bezpośrednio z danych prac,
                        ale
                        zostały przeniesione z kilku głównych wcześniejszych kompilacji.</p>


                </div>
                <div>
                    <h2 className={classes.main_subtitle}>Tekst oryginalny to w przeważającej części łacina</h2>
                    <h2>jednak 20 ustaw jest w całości po grecku</h2>
                    <ul className={classes.main_items_leges}>
                        <li>D.1.4.4</li>
                        <li>D.14.2.9</li>
                        <li>D.19.2.49</li>

                        <li>D.26.3.1</li>
                        <li>D.26.5.21</li>

                        <li>D.26.5.22</li>
                        <li>D.27.1.1</li>

                        <li>D.27.1.2</li>

                        <li>D.27.1.4</li>
                        <li>D.27.1.6</li>

                        <li>D.27.1.8</li>

                        <li>D.27.1.10</li>

                        <li>D.27.1.12</li>
                        <li>D.27.1.13</li>

                        <li>D.27.1.14</li>
                        <li>D.27.1.15</li>

                        <li>D.36.1.15</li>
                        <li>D.43.10.1</li>

                        <li>D.50.1.35</li>
                        <li>D.50.16.104</li>


                    </ul>
                    <h2 className={classes.main_subtitle}>Natomiast w 166 greka występuje</h2>
                </div>
            </div>


            <h3>Jeśli chcesz poznać szczegółowe statystyki dotyczące udziału poszczególnych ksiąg, tytułów, jurystów i
                ich
                dzieł w Digestach, w księgach i tytułach, przejdź do odpowiedniej sekcji.</h3>

            <div className={classes.main_actions}>
                <Button onClick={() => redirectionHandler("digesta")}>DIGESTA</Button>


                <Button onClick={() => redirectionHandler("jurysci")}>JURYŚCI</Button>
                <Button onClick={() => redirectionHandler("opera")}>PRACE JURYSTÓW</Button>

            </div>


            {/*<Outlet/>*/}

        </div>
    )
}

export default DigestaStats