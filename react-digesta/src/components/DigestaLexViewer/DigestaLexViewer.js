import {useSelector} from "react-redux";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {loadLex} from "../../store/digesta-actions";

const DigestaLexViewer = () => {
    const dispatch = useDispatch()
    const lex = useSelector(state => state.digesta.currentLex)

    const id = useSelector(state => state.digesta.lexId)
    useEffect(() => {

        dispatch(loadLex(id))
    }, [id, dispatch])

    return (
        <section>
            {lex &&
                <div>
                    <button>{lex.author.name}</button>
                    <button>{lex.opus.book} {lex.opus.title_pl}</button>
                    <p> {lex.text_lat}</p>
                    <p> {lex.text_pl}</p>
                </div>
            }
        </section>

    )
}
export default DigestaLexViewer