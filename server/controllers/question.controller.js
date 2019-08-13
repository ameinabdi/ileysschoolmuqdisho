import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Questions from '../models/question.model';
import logger from '../config/winston';

/**
 * Returns jwt token if valid email and password is provided
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function addNewQuestion(req, res) {
    const { title, subjectId, classId, body, marks } = req.body;
    console.log("waa", subjectId)
    Questions.forge({
        title,
        subjectId,
        classId,
        body,
        marks
    }, {hasTimestamps: false}).save()
        .then(questions => res.json({
                success: true,
                data: questions.toJSON()
            })
        )
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}

export function findAllQuestion(req, res){
    Questions.forge()
    .fetchAll()
    .then(questions => res.json({
            error: false,
            data: questions.toJSON(),
          
        },  console.log("wee", questions.toJSON()))
    )
    .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            error: err
        })
    );
}

export function findByIdQuestion(req, res) {
    Questions.forge({Qid: req.params.id})
        .fetch()
        .then(questions => {
            if (!questions) {
                res.status(HttpStatus.NOT_FOUND).json({
                    error: true, data: {}
                });
            }
            else {
                res.json({
                    error: false,
                    data: questions.toJSON()
                });
            }
        })
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}

export function updateQuestion(req, res) {
    Questions.forge({Qid: req.params.id})
        .fetch({require: true})
        .then(questions => questions.save({
                title: req.body.title || classes.get('title'),
                subjectId: req.body.subjectId || classes.get('subjectId'),
                subjectName: req.body.subjectName || classes.get('subjectName'),
                classId: req.body.classId || classes.get('classId'),
                className: req.body.className || classes.get('className'),
                body: req.body.body || classes.get('body'),
                marks: req.body.marks || classes.get('marks'),
                
            })
                .then(() => res.json({
                        error: false,
                        data: questions.toJSON()
                    })
                )
                .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                        error: true,
                        data: {message: err.message}
                    })
                )
        )
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}

export function destroyQuestion(req, res) {
    Questions.forge({Qid: req.params.id})
        .fetch({require: true})
        .then(questions => questions.destroy()
            .then(() => res.json({
                    error: false,
                    data: {message: 'User deleted successfully.'}
                })
            )
            .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: true,
                    data: {message: err.message}
                })
            )
        )
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}