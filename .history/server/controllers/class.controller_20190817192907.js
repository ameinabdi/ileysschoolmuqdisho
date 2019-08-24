import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Classes from '../models/class.model';
import logger from '../config/winston';
import connection from '../config/database'
import moment from 'moment';

/**
 * Returns jwt token if valid email and password is provided
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function addNewClass(req, res) {
    const created_at = moment().format("YYYY-MM-DDTHH:mm");
    const updated_at = moment().format("YYYY-MM-DDTHH:mm");

    const { className } = req.body;
    console.log("waa", className)
    connection.query("INSERT INTO classes(`className`, `created_at`,`updated_at`)VALUES ('" +className+ "', '" +created_at+ "', '" +updated_at+ "')")
        .then(classes => res.json({
                success: true,
                data: classes
            })
        )
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}

export function findAllClass(req, res){
    connection.query('SELECT * FROM classes')
    .then(classes => res.json({
            error: false,
            data: classes
        })
    )
    .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            error: err
        })
    );
}

export function findByIdClass(req, res) {
    connection.query('SELECT * FROM classes WHERE classId = ?',req.params.id)
        .then(classes => {
            if (!classes) {
                res.status(HttpStatus.NOT_FOUND).json({
                    error: true, data: {}
                });
            }
            else {
                res.json({
                    error: false,
                    data: classes
                });
            }
        })
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}

export function updateClass(req, res) {
    const updated_at = moment().format("YYYY-MM-DDTHH:mm");
    connection.query('SELECT * FROM classes WHERE classId = ?',req.params.id)
        .then(classes => {
               const updateObject = {
                   className: req.body.className || classes[0].className,
                   created_at: classes[0].created_at,
                   updated_at: updated_at
               }
            connection.query(`UPDATE classes SET ? WHERE classId= ${req.params.id}`,updateObject)
                .then(() => res.json({
                        error: false,
                        data: classes
                    })
                )
                .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                        error: true,
                        data: {message: err.message}
                    })
                )
                }
        )
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}

export function destroyClass(req, res) {
    connection.query('DELETE FROM classes WHERE classId = ?',req.params.id)
            .then(() => res.json({
                    error: false,
                    data: {message: 'class deleted successfully.'}
                })
            )
            .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: true,
                    data: {message: err.message}
                })
            )
}