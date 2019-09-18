// Import custom components
import {
    EXAM_SUCCESS,
    EXAM_FAILURE
} from '../constants/actionType';

var initialState = {
    exam: [],
    isLoading: false,

};

/**
 * A reducer takes two arguments, the current state and an action.
 */
const examReducer = (state, action) => {
    state = state || initialState;

    switch (action.type) {
        case EXAM_SUCCESS:
            return Object.assign({}, state, {
                isLoading: false,
                exam: action.data,
            });

        case EXAM_FAILURE:
            return Object.assign({}, state, {
                isLoading: false,
                exam: action.data,
            });
        default:
            return state;
    }
};

export default examReducer;