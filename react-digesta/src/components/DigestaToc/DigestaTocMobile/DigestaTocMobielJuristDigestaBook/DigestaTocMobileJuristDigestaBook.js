import classes from "./DigestaTocMobileJuristDigestaBook.module.css"
import DigestaTocMobileTitulus from "../DigestaTocMobileTitulus/DigestaTocMobileTitulus";
import {useSelector, useDispatch} from "react-redux";
import {digestaActions} from "../../../../store/digesta-slice";
import {useNavigate} from "react-router-dom";
import TocMobile from "../../../UI/TocMobile/TocMobile";
import {useState} from "react";
import {useEffect} from "react";
import DigestaTocMobileJuristDigestaTitulus
    from "../DigestaTocMobileJuristDigestaTitulus/DigestaTocMobileJuristDigestaTitulus";
const DigestaTocMobileJuristDigestaBook = ({book_id, author_id}) => {
   const [tituli, setTituli] = useState([])
    const [titulusId, setTitulusId] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const chosenTitulusId = useSelector(state => state.digesta.chosenTitulusId)
    const onOptionChangeHandler = (event) => {
        // dispatch(digestaActions.setChosenTitulusId(parseInt(event.target.value)))
        // navigate(url)
        setTitulusId(event.target.value)
    }
    useEffect(() => {
        const urlLoadTituli = process.env.REACT_APP_BASE_API_URL + `digesta/tituli/author/${book_id}/${author_id}`

        const sendRequest = async () => {
            const response = await fetch(urlLoadTituli)
            if (!response.ok) {
                throw new Error()
            }
            return await response.json()
        }
        sendRequest().then((response)=>{

            setTituli(response)
        }).catch((e)=>(console.log(e)))
    }, [book_id, author_id])
    // const tituli = props.tituli

    return (
        <>
            <TocMobile onOption={onOptionChangeHandler}>

                <option value={''}>Wybierz Tytuł</option>

                {tituli && tituli.map(titulus => (
                    <option key={titulus.id} value={titulus.id}>{titulus.number} {titulus.title_lat}</option>))}
                })}
            </TocMobile>
            {titulusId && <DigestaTocMobileJuristDigestaTitulus author_id={author_id} titulus_id={titulusId}/>}
        </>
    )
}
export default DigestaTocMobileJuristDigestaBook

