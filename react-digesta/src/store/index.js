import {createStore} from 'redux';

const initialState = {
    counter: 0,
    logging: false
}
const myReducer = (state = initialState, action) => {
    if (action.type === "increment") {
        return {
            counter: state.counter + 1
        }
    }

    if (action.type === 'decrement') {
        return {
            counter: state.counter - 1
        }
    }

    if (action.type === 'loggingToggle') {
        return {
            logging: !state.logging
        }
    }


    return state

}


const store = createStore(myReducer)


export default store