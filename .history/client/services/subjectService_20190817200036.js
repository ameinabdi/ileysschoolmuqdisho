import axios from 'axios';

import {subjectSuccess, subjectFailure} from '../actions/subjectAction';
import history from '../utils/history';
import {API_URL} from '../config/config';
import {setLocalStorage, clearLocalStorage} from '../utils/storageUtil';

export const AddSubject = (data) => {
      const {subjectName, classId } = data;
     console.log("newdata", data)
    return dispatch => {
        axios.post(API_URL + 'subjects', {subjectName,classId}).then((response) => {
            console.log(response)
            dispatch(Subjects());
            history.push('/dashboard');
        })
            .catch((error) => {
                dispatch(subjectFailure(error.response));
            });
    };
};

export const Subjects = () => {
   return dispatch => {
       axios.get(API_URL + 'subjects' ).then((response) => {
           console.log('response',response)
           dispatch(subjectSuccess(response.data));
 
       })
           .catch((error) => {
               dispatch(subjectFailure(error.response));
           });
   };
};


export const UpdateSubject = (data) => {
    const {subjectName, classId,id } = data;
   console.log("newdata", data)
  return dispatch => {
      axios.put(API_URL + `subjects/${id}`, {subjectName,classId}).then((response) => {
          console.log(response)
          dispatch(Subjects());
          history.push('/question');
      })
          .catch((error) => {
              dispatch(subjectFailure(error.response));
          });
  };
};

export const DeleteSubject = (data) => {
    
  return dispatch => {
      axios.delete(API_URL + `subjects/${data}`).then((response) => {
          console.log(response)
          dispatch(Subjects());
          history.push('/question');
      })
          .catch((error) => {
              dispatch(subjectFailure(error.response));
          });
  };
};