import {Form, json} from "react-router-dom";
import {useState} from "react";

const DigestaSearch = (props) => {
    console.log(props.lang, 'here')
    return (
        <Form method="post" action="">
            <label>W tekście {props.language}</label>
            <input id="searched_term" name="searched_term" type="text" />
            <input type="hidden" id="language" name="language" value={props.lang} />
            <button type="submit">Szukaj</button>
        </Form>
    )
}

export default DigestaSearch

