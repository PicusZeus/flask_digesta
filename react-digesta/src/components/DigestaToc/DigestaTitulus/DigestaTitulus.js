import DigestaLex from "../DigestaLex/DigestaLex";


const DigestaTitulus = (props) => {

    return (
        <div>
            <h5>{props.numerus}</h5>
            <h3>{props.title_lat}</h3>
            <h4>{props.title_pl}</h4>
            {props.leges.map(lex => {
                return (<DigestaLex key={lex.id}
                                    lex_nr={lex.lex_nr}
                                    id={lex.id}/>)
            })}
        </div>
    )
}

export default DigestaTitulus