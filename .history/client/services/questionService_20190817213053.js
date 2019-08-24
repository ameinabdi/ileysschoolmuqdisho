import axios from 'axios';

import {questionSuccess, questionFailure } from '../actions/questionAction';
import history from '../utils/history';
import {API_URL} from '../config/config';
import {setLocalStorage, clearLocalStorage} from '../utils/storageUtil';
import Question from './question.json';

export const question = () => {
    return dispatch => {
        axios.get(API_URL + 'questions').then((response) => {
          dispatch(questionSuccess(response.data));
        }).catch((error)=>{
            dispatch(questionFailure(error.response));

        })
    };
};

export const AddQuestion = (data) => {
  const {title, subjectId, classId, marks, body} = data;
  console.log("newdata", data)
return dispatch => {
    axios.post(API_URL + 'questions', {title, subjectId, classId, marks, body}).then((response) => {
        console.log(response)
        dispatch(question());
        history.push('/dashboard');
    })
        .catch((error) => {
            dispatch(questionFailure(error.response));
        });
};
};

export const allQuestions = () => {
    return dispatch => {
        axios.get(API_URL + 'questions/all' ).then((response) => {
            console.log('response',response)
            dispatch(allquestionSuccess(response.data));
  
        })
            .catch((error) => {
                dispatch(allquestionFailure(error.response));
            });
    };
 };
 
 