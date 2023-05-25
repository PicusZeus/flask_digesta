import classes from "./Main.module.css"
import {Link} from "react-router-dom";

const Main = () => {

    return (
        <>
            <h1 className={classes.main_title}>DIGESTA SEU PANDECTA IUSTINIANI</h1>
            {/*<h3 className={classes.main_subtitle}>Tekst oryginalny z narzędziami do </h3>*/}


            <div className={classes.main__info}>
                Strona, na którą wszedłeś, zawiera tekst Digestów Justyniańskich, najważniejszej kompilacji prawa
                rzymskiego, która dotrwała do naszych czasów.
                Tekst Digestów możesz przeglądać na różne sposoby: tradycyjnie, według układu Digestów, według jurystów,
                których prace zostały wykorzystane w tej kompilacji, według prac tychże jurystów, jak również możesz
                wyszukać w tekście interesujących Cię terminów.
                Dostępne są również szczegółowe statystyki dotyczące poszczególnych jurystów, ich dzieł, ksiąg i tytułów
                Digestów. Po rejestracji będziesz miał możliwość dodawania prywatnych i publicznych notatek do
                poszczególnych ustaw i paragrafów.
            </div>
            <ul className={classes.main_items}>
                <li className={classes.main_item}>
                    <section className={classes.main_item__container}>
                        <h1 className={classes.main_item__title}>DIGESTA</h1>
                        <p className={classes.main_item__description}>
                            Digesta Justyniańskie zorganizowane według tradycyjnego podziału na księgi, tytuły, ustawy.
                            Jeśli wiesz czego konkretnie potrzebujesz, lub chcesz po prostu przeglądać treść
                            digestów, wejdź tutaj.
                            Znajdziesz tutaj pod każdą ustawą odnośniki do autorów poszczególnych ustaw, oraz do ich
                            dzieł.
                        </p>
                        <Link className={classes.main_item_link} to="digesta">Przejdź</Link>
                    </section>

                </li>
                <li className={classes.main_item}>
                    <section className={classes.main_item__container}>
                        <h1 className={classes.main_item__title}>JURYŚCI</h1>

                        <p className={classes.main_item__description}>
                            Tutaj znajdziesz spis jurystów, których prace zawarte są w digestach. Prace jurystów można
                            przeglądać na dwa sposoby,
                            albo w ramach tradycyjnego układu digestów, albo poprzez listę ich dzieł cytowanych w
                            Digestach. Znajdziesz tu też krótki biogram jurysty.
                        </p>

                        <Link className={classes.main_item_link} to="jurysci">Przejdź</Link>
                    </section>
                </li>
                <li className={classes.main_item}>
                    <section className={classes.main_item__container}>
                        <h1 className={classes.main_item__title}>PRACE JURYSTÓW</h1>

                        <p className={classes.main_item__description}>
                            Znajdziesz tutaj spis wszystkich dzieł prawniczych, które zostały zacytowane w Digestach, z
                            odtworzonym podziałem na księgi.

                        </p>
                        <Link className={classes.main_item_link} to="opera">Przejdź</Link>
                    </section>
                </li>

                <li className={classes.main_item}>
                    <section className={classes.main_item__container}>
                        <h1 className={classes.main_item__title}>WYSZUKAJ</h1>

                        <p className={classes.main_item__description}>
                            Tutaj będziesz mógł wyszukać interesującą Cię fraze lub słowa w całym tekście digestów.
                        </p>
                        <Link className={classes.main_item_link} to="Wyszukaj">Przejdź</Link>
                    </section>
                </li>

                <li className={classes.main_item}>
                    <section className={classes.main_item__container}>
                        <h1 className={classes.main_item__title}>STATYSTYKI</h1>

                        <p className={classes.main_item__description}>
                            Jeśli interesują cię dokładne dane na temat procentowego udziału jurystów i ich dzieł w poszczególnych częściach Digestów, wejdź tutaj.
                        </p>
                        <Link className={classes.main_item_link} to="statystyki">Przejdź</Link>
                    </section>
                </li>

            </ul>

        </>


    )
}

export default Main