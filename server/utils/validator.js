import Joi from 'joi';

export default {
    storeUser: {
        body: {
            first_name: Joi.string().required(),
            last_name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required()
        }
    },




    updateClass: {
        body: {
            className: Joi.string().required(),
        },
        params: {
            classId: Joi.string().hex().required()
        }
    },

    storeSubject: {
        body: {
            subjectName: Joi.string().required(),
            classId: Joi.string().required(),

        }
    },
    updateSubject: {
        body: {
            subjectName: Joi.string().required(),
            classId: Joi.string().required(),
            className: Joi.string().required(),
        },
        params: {
            subjectId: Joi.string().hex().required()
        }
    },
    storeQuestion: {
        body: {
            title: Joi.string().required(),
            subjectId: Joi.string().required(),
            classId: Joi.string().required(),
            marks: Joi.string().required(),
            body: Joi.string().required(),

        }
    },
    updateQuestion: {
        body: {
            title: Joi.string().required(),
            subjectName: Joi.string().required(),
            subjectId: Joi.string().required(),
            classId: Joi.string().required(),
            className: Joi.string().required(),
            marks: Joi.string().required(),
            body: Joi.string().required(),
        },
        params: {
            Qid: Joi.string().hex().required()
        }
    },
    updateUser: {
        body: {
            first_name: Joi.string().required(),
            last_name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required()
        },
        params: {
            userId: Joi.string().hex().required()
        }
    },

    login: {
        body: {
            username: Joi.string().required(),
            password: Joi.string().required()
        }
    },
    storeExam: {
        body: {
            title: Joi.string().required(),
            body: Joi.string().required(),
            marks: Joi.string().required(),
            id: Joi.string().required(),


        }
    },


};