



const DigestaLex = (props) => {
    const openLexHandler = (id) => {

    }

    return (
        <li onClick={()=>openLexHandler(props.id)}>{props.lex_nr}</li>
    )
}

export default DigestaLex