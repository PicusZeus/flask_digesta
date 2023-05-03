import {Form} from "react-router-dom";
import classes from "./DigestaSearch.module.css";
import {useState} from "react";

const DigestaSearch = (props) => {

    const [lang, setLang] = useState('lat')


    const setLanguageHandler = (event) => {
        // event.preventDefault()
        console.log(event.target.value)
        setLang(event.target.value)
    }

    return (
        <>

            <div className={classes.form__search}>
                <div className={classes.form__choose_language}>
                    <label htmlFor="selectLang">Wyszukiwanie w tekście</label>
                    <select id="selectLang" onChange={setLanguageHandler}>
                        <option value='lat'>oryginalnym</option>
                        <option value='pl'>polskim</option>
                    </select>
                </div>

                <input className={classes.form__input} id="searched_term" name="searched_term" type="text"/>
                <input type="hidden" id="lang" name="lang" value={lang}/>
            </div>
            {/*<input type="hidden" id="language" name="language" value={props.lang}/>*/}
            <button className={classes.form__submit} type="submit">Szukaj</button>
        </>

    )
}

export default DigestaSearch

