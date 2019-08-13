// Import actionType constants
import {
    SUBJECT_SUCCESS,
    SUBJECT_FAILURE,
} from '../constants/actionType';

export const subjectSuccess = (data) => {
    return {
        type: SUBJECT_SUCCESS,
        data
    };
};

export const subjectFailure = (error) => {
    return {
        type: SUBJECT_FAILURE,
        error
    };
};