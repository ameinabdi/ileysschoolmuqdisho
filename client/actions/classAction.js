// Import actionType constants
import {
    CLASS_SUCCESS,
    CLASS_FAILURE,
} from '../constants/actionType';

export const classSuccess = (data) => {
    return {
        type: CLASS_SUCCESS,
        data
    };
};

export const classFailure = (error) => {
    return {
        type: CLASS_FAILURE,
        error
    };
};