import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Classes from '../models/class.model';
import logger from '../config/winston';

/**
 * Returns jwt token if valid email and password is provided
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function addNewClass(req, res) {
    const { className } = req.body;
    console.log("waa", className)
    Classes.forge({
        className
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

export function findAllClass(req, res){
    Classes.forge()
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

export function findByIdClass(req, res) {
    Classes.forge({classId: req.params.id})
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

export function updateClass(req, res) {
    Classes.forge({classId: req.params.id})
        .fetch({require: true})
        .then(classes => classes.save({
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

export function destroyClass(req, res) {
    Classes.forge({classId: req.params.id})
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