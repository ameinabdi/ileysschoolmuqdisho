// Import custom components
import {
    CLASS_SUCCESS,
    CLASS_FAILURE
} from '../constants/actionType';

var initialState = {
    classes: null,
    isLoading: false
};

/**
 * A reducer takes two arguments, the current state and an action.
 */
const classReducer = (state, action) => {
    state = state || initialState;

    switch (action.type) {
        case CLASS_SUCCESS:
            return Object.assign({}, state, {
                isLoading: false,
                classes: action.data,
            });

        case CLASS_FAILURE:
            return Object.assign({}, state, {
                isLoading: false,
                classes: null,
                errorMessage: action.error || 'Something went wrong.'
            });

        default:
            return state;
    }
};

export default classReducer;