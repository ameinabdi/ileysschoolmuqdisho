// Import actionType constants
import {
    QUESTION_SUCCESS,
    QUESTION_FAILURE,
} from '../constants/actionType';

export const questionSuccess = (data) => {
    return {
        type: QUESTION_SUCCESS,
        data
    };
};

export const questionFailure = (error) => {
    return {
        type: QUESTION_FAILURE,
        error
    };
};
