import axios from 'axios';

import { examSuccess, examFailure } from '../actions/examAction';
import history from '../utils/history';
import { API_URL } from '../config/config';
import { setLocalStorage, clearLocalStorage } from '../utils/storageUtil';
import Question from './question.json';


export const create = (data) => {
    console.log("newdata", data)
    const alldata = {
        body: data
    }
    return dispatch => {
        axios.post(API_URL + 'exam', alldata).then((response) => {
            console.log(response)
            dispatch(examSuccess(response.data));
            history.push('/dashboard');
        })
            .catch((error) => {
                dispatch(examSuccess(error));
            });
    };
};

export const allQuestions = () => {
    return dispatch => {
        axios.get(API_URL + 'questions/all').then((response) => {
            console.log('response', response)
            dispatch(questionSuccess(response.data));

        })
            .catch((error) => {
                dispatch(questionFailure(error.response));
            });
    };
};


export const UpdateQuestion = (data) => {
    const { title, subjectId, classId, marks, body, id } = data;
    console.log("newdata", data)
    return dispatch => {
        axios.put(API_URL + `questions/${id}`, { title, subjectId, classId, marks, body }).then((response) => {
            console.log(response)
            dispatch(allQuestions());
            history.push('/question');
        })
            .catch((error) => {
                dispatch(questionFailure(error.response));
            });
    };
};

export const DeleteQuestion = (data) => {
    console.log("response", data)

    return dispatch => {
        axios.delete(API_URL + `questions/${data}`).then((response) => {
            console.log(response)
            dispatch(allQuestions());
            history.push('/question');
        })
            .catch((error) => {
                dispatch(questionFailure(error.response));
            });
    };
};