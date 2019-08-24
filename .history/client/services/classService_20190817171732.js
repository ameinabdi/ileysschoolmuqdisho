import axios from 'axios';

import {classSuccess, classFailure} from '../actions/classAction';
import history from '../utils/history';
import {API_URL} from '../config/config';
import {setLocalStorage, clearLocalStorage} from '../utils/storageUtil';

export const AddClass = ({className}) => {
     console.log("newdata", className)
    return dispatch => {
        axios.post(API_URL + 'classes', {className}).then((response) => {
            console.log(response)
            dispatch(classSuccess(response.data));
            history.push('/dashboard');
        })
            .catch((error) => {
                dispatch(classFailure(error.response));
            });
    };
};

export const Classes = () => {
   return dispatch => {
       axios.get(API_URL + 'classes' ).then((response) => {
           console.log(response)
           dispatch(classSuccess(response.data));
        })
           .catch((error) => {
               dispatch(classFailure(error.response));
           });
   };
};



export const UpdateClass = (data) => {
    const {className,id } = data;
   console.log("newdata", data)
  return dispatch => {
      axios.put(API_URL + `classes/${id}`, {className}).then((response) => {
          console.log(response)
          dispatch(Classes());
       })
          .catch((error) => {
              dispatch(classFailure(error.response));
          });
  };
};

export const DeleteClass = (data) => {
    console.log('delete',data)

  return dispatch => {
      axios.delete(API_URL + `classes/${data}`).then((response) => {
          dispatch(Classes());
       })
          .catch((error) => {
              dispatch(classFailure(error.response));
          });
  };
};