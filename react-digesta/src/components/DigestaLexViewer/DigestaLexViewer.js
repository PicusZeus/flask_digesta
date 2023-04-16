import {useSelector} from "react-redux";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {loadLex} from "../../store/digesta-actions";
import {Link} from "react-router-dom";

const DigestaLexViewer = (props) => {
    const dispatch = useDispatch()
    // const lex = useSelector(state => state.digesta.currentLex)
   const lex = props.lex
    const id = useSelector(state => state.digesta.lexId)
    useEffect(() => {

        dispatch(loadLex(id))
    }, [id, dispatch])

    const linkAuthor = "http://127.0.0.1:3000/jurysci/" + lex.author.id
    const linkOpus = 'http://127.0.0.1:3000/jurysci/' + lex.author.id + '/' + lex.opus.id
    return (
        <section>
            {lex &&
                <div>
                    <Link to={linkAuthor} >{lex.author.name}</Link>
                    <Link to={linkOpus}>{lex.opus.book} {lex.opus.title_pl}</Link>
                    <p> {lex.text_lat}</p>
                    <p> {lex.text_pl}</p>
                </div>
            }
        </section>

    )
}
export default DigestaLexViewer