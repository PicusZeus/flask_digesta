import DigestaTocMobileOpus from "../DigestaTocMobileOpus/DigestaTocMobileOpus";
import TocMobile from "../../../UI/TocMobile/TocMobile";
import {useDispatch, useSelector} from "react-redux";
import {digestaActions} from "../../../../store/digesta-slice";

const DigestaTocMobileOpera = ({opera, lexPath}) => {
    const dispatch = useDispatch()

    const onOptionChangeHandler = (event) => {

        dispatch(digestaActions.setChosenOpusId(parseInt(event.target.value)))

    }
    const chosenOpusId = useSelector(state => state.digesta.chosenOpusId)
    const chosenOpus = opera.filter(o=>o.id === chosenOpusId).shift()


    return (
        <>
            <TocMobile onOption={onOptionChangeHandler}>

                <option value={''}>{chosenOpus ? chosenOpus.title_lat : "Wybierz dzieło"}</option>
                {opera && opera.map(opus => {
                    return (<option key={opus.id} value={opus.id}>
                        {opus.title_lat} - {opus.author.name}
                    </option>)
                })}

            </TocMobile>
            {chosenOpus && <DigestaTocMobileOpus opusId={chosenOpus.id} opus={chosenOpus} lexPath={lexPath}/>}

        </>
    )
}

export default DigestaTocMobileOpera