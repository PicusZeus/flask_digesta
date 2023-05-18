import classes from "./DigestaSearch.module.css";
import {useDispatch, useSelector} from "react-redux";
import {digestaActions} from "../../store/digesta-slice";

const DigestaSearch = () => {

    const dispatch = useDispatch()
    const lang = 'lat'


    const setLanguageHandler = (event) => {
        dispatch(digestaActions.setLang(event.target.value))
    }

    return (
        <>

            <div className={classes.form__search}>
                <div className={classes.form__choose_language}>
                    <label htmlFor="selectLang">Wyszukiwanie w tekście</label>
                    {/*<select id="selectLang" onChange={setLanguageHandler}>*/}
                    {/*    <option value='lat'>oryginalnym</option>*/}
                    {/*    <option value='pl'>polskim</option>*/}
                    {/*</select>*/}
                </div>

                <input className={classes.form__input} id="searched_term" name="searched_term" type="text"/>
                <input type="hidden" id="lang" name="lang" value={lang}/>
            </div>
            <button className={classes.form__submit} type="submit">Szukaj</button>
        </>

    )
}

export default DigestaSearch

