import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import {reducer as formReducer} from 'redux-form';
import classReducer from './classReducer';
// Import custom components
import authReducer from './authReducer';
import questionReducer from './questionReducer';
import subjectReducer from './subjectReducer';
const appReducer = (history) => combineReducers({
    router: connectRouter(history),
    form: formReducer,  // ← redux-form
    auth: authReducer,
    question: questionReducer,
    classes: classReducer,
    subject: subjectReducer,
});

const rootReducer = (state, action) => {

    if (action === 'LOG_OUT_SUCCESS') {
        state = undefined;
    }

    return appReducer(state, action);
};

export default rootReducer;