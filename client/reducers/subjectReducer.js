// Import custom components
import {
    SUBJECT_SUCCESS,
    SUBJECT_FAILURE
} from '../constants/actionType';

var initialState = {
    subject: null,
    isLoading: false
};

/**
 * A reducer takes two arguments, the current state and an action.
 */
const subjectReducer = (state, action) => {
    state = state || initialState;

    switch (action.type) {
        case SUBJECT_SUCCESS:
            return Object.assign({}, state, {
                isLoading: false,
                subject: action.data,
            });

        case SUBJECT_FAILURE:
            return Object.assign({}, state, {
                isLoading: false,
                classes: null,
                subject: action.error || 'Something went wrong.'
            });

        default:
            return state;
    }
};

export default subjectReducer;