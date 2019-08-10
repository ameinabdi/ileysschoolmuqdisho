import axios from 'axios';

import {questionSuccess, questionFailure} from '../actions/questionAction';
import history from '../utils/history';
import {API_URL} from '../config/config';
import {setLocalStorage, clearLocalStorage} from '../utils/storageUtil';
import Question from './question.json';

export const question = () => {
    return dispatch => {
        axios.get(API_URL + 'api/users').then((response) => {
          dispatch(questionSuccess(Question));
        })
    };
};
