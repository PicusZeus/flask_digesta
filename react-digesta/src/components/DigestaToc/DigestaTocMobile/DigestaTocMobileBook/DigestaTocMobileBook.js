import DigestaTocMobileTitulus from "../DigestaTocMobileTitulus/DigestaTocMobileTitulus";
import {useSelector, useDispatch} from "react-redux";
import {digestaActions} from "../../../../store/digesta-slice";
import {useNavigate} from "react-router-dom";
import TocMobile from "../../../UI/TocMobile/TocMobile";
const DigestaTocMobileBook = (props) => {
    const url = props.url

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const chosenTitulusId = useSelector(state => state.digesta.chosenTitulusId)
    const onOptionChangeHandler = (event) => {
        dispatch(digestaActions.setChosenTitulusId(parseInt(event.target.value)))
        navigate(url)
    }

    const tituli = props.tituli

    const chosenTitulus = tituli.filter(t=>t.id===chosenTitulusId)

    return (
        <>
            <TocMobile onOption={onOptionChangeHandler}>

                <option value={''}>{chosenTitulus ? `${chosenTitulus.number} ${chosenTitulus.title_lat}` : "Wybierz Tytuł"}</option>

                {tituli && tituli.map(titulus => (
                    <option key={titulus.id} value={titulus.id}>{titulus.number} {titulus.title_lat}</option>))}
                })}
            </TocMobile>
            {chosenTitulus ? <DigestaTocMobileTitulus url={url} id={chosenTitulusId}/> : false}
        </>
    )
}
export default DigestaTocMobileBook

