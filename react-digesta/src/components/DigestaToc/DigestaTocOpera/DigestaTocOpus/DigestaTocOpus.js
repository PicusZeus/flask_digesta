import classes from "./DigestaTocOpus.module.css"
import {useNavigate} from "react-router-dom";


const DigestaTocOpus = (props) => {
    const navigate = useNavigate()
    const onOptionChangeHandler = (event) => {
        const lex_id = event.target.value
        navigate(lex_id.toString())
    }
    const content = props.content
    const leges = props.content.leges
    console.log(props.content, 'CO')
    return (
        <>
            <div>{content.book} {content.title_lat} </div>
            {/*<div>{content.author.name}</div>*/}

            <label className={classes.main_toc__label}>Wybierz fragment</label>

            <select className={classes.main_toc__opus_option} onChange={onOptionChangeHandler}>
                <option key={666666} value={null}>Wybierz ustawę</option>

                {leges && leges.map(lex => (<option key={lex.id} value={lex.id}>D.{lex.book.book_nr}.{lex.titulus.number}.{lex.lex_nr}</option>))}
                })}
            </select>

        </>

    )
}

export default DigestaTocOpus