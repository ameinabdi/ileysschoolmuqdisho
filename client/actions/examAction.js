// Import actionType constants
import {
    EXAM_SUCCESS,
    EXAM_FAILURE,
} from '../constants/actionType';

export const examSuccess = (data) => {
    return {
        type: EXAM_SUCCESS,
        data
    };
};

export const examFailure = (error) => {
    return {
        type: EXAM_FAILURE,
        error
    };
};
