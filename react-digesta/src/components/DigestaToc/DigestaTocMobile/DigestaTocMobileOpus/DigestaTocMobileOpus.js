import TocMobile from "../../../UI/TocMobile/TocMobile";
import {useState} from "react";
import DigestaTocMobileOpusLiber from "../DigestaTocMobileOpusLiber/DigestaTocMobileOpusLiber";
import {digestaActions} from "../../../../store/digesta-slice";
import {useDispatch} from "react-redux";

const DigestaTocMobileOpus = ({opus, lexPath}) => {
    const [chosenBook, setChosenBook] = useState(false)
    const dispatch = useDispatch()
    const onChoseBookHandler = (event) => {
        const liber_id = event.target.value
        dispatch(digestaActions.setChosenOpusLiberId(liber_id))
        const liber = opus.libri.filter((liber)=>{
            return (liber.id===parseInt(liber_id))})[0]
            setChosenBook(liber)
    }


    const libri = opus.libri
    return (
        <>
        <TocMobile onOption={onChoseBookHandler}>
            <option value={''}>Wybierz księgę</option>

            {libri && libri.map(liber => (
                <option key={liber.id} value={liber.id}>
                    Księga {liber.liber}
                </option>))}
        </TocMobile>

            {chosenBook && <DigestaTocMobileOpusLiber liber={chosenBook} lexPath={lexPath}/>}

</>

)
}

export default DigestaTocMobileOpus