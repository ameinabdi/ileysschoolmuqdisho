import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Subjects from '../models/subject.modal';
import logger from '../config/winston';

/**
 * Returns jwt token if valid email and password is provided
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function addNewSubject(req, res) {
    const { subjectName, classId } = req.body;
    console.log("waa", subjectName)
    Subjects.forge({
        subjectName,
        classId
    }, {hasTimestamps: false}).save()
        .then(classes => res.json({
                success: true,
                data: classes.toJSON()
            })
        )
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}

export function findAllSubject(req, res){
    Subjects.forge()
    .fetchAll()
    .then(classes => res.json({
            error: false,
            data: classes.toJSON()
        })
    )
    .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            error: err
        })
    );
}

export function findByIdSubject(req, res) {
    Subjects.forge({subjectId: req.params.id})
        .fetch()
        .then(classes => {
            if (!classes) {
                res.status(HttpStatus.NOT_FOUND).json({
                    error: true, data: {}
                });
            }
            else {
                res.json({
                    error: false,
                    data: classes.toJSON()
                });
            }
        })
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}

export function updateSubject(req, res) {
    Subjects.forge({subjectId: req.params.id})
        .fetch({require: true})
        .then(classes => classes.save({
                subjectName: req.body.subjectName || classes.get('subjectName'),
                classId: req.body.classId || classes.get('classId'),
                className: req.body.className || classes.get('className'),
            })
                .then(() => res.json({
                        error: false,
                        data: classes.toJSON()
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

export function destroySubject(req, res) {
    Subjects.forge({subjectId: req.params.id})
        .fetch({require: true})
        .then(classes => classes.destroy()
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