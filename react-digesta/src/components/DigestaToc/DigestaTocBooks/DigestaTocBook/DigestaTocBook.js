import classes from "./DigestaTocBook.module.css"
import DigestaTocTitulus from "./DigestaTocTitulus/DigestaTocTitulus";
import {useSelector, useDispatch} from "react-redux";
import {digestaActions} from "../../../../store/digesta-slice";
import {useNavigate} from "react-router-dom";
const DigestaTocBook = (props) => {
    const url = props.url

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const chosenTitulusId = useSelector(state => state.digesta.chosenTitulusId)
    const onOptionChangeHandler = (event) => {
        dispatch(digestaActions.setChosenTitulusId(parseInt(event.target.value)))
        navigate(url)
    }

    const tituli = props.tituli

    return (
        <>
            <label className={classes.main_toc__label}>Wybierz Tytuł</label>

            <select className={classes.main_toc__titulus_option} onChange={onOptionChangeHandler}>
                <option value={''}>Wybierz Tytuł</option>

                {tituli && tituli.map(titulus => (
                    <option key={titulus.id} value={titulus.id}>{titulus.number} {titulus.title_lat}</option>))}
                })}
            </select>
            {chosenTitulusId && <DigestaTocTitulus url={url} leges={tituli.filter((titulus) => {
                return (titulus.id === chosenTitulusId)
            })[0].leges}/>}
        </>
    )
}
export default DigestaTocBook

