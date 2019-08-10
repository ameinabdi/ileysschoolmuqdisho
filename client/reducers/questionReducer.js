// Import custom components
import {
    QUESTION_SUCCESS,
    QUESTION_FAILURE
} from '../constants/actionType';

var initialState = {
    question: [],
    isLoading: false,

};

/**
 * A reducer takes two arguments, the current state and an action.
 */
const questionReducer = (state, action) => {
    state = state || initialState;

    switch (action.type) {
        case QUESTION_SUCCESS:
            return Object.assign({}, state, {
                isLoading: false,
                question: action.data,
            });

        case QUESTION_FAILURE:
            return Object.assign({}, state, {
                isLoading: false,
                question: action.data,
            });
        default:
            return state;
    }
};

export default questionReducer;