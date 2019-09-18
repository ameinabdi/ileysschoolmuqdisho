// Import actionType constants
import {
    EXAM_SUCCESS,
    EXAM_FAILURE,
} from '../constants/actionType';

export const questionSuccess = (data) => {
    return {
        type: EXAM_SUCCESS,
        data
    };
};

export const questionFailure = (error) => {
    return {
        type: EXAM_FAILURE,
        error
    };
};
