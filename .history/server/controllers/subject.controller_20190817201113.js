import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
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
export function addNewSubject(req, res) {
    const { subjectName, classId } = req.body;
    const created_at = moment().format("YYYY-MM-DDTHH:mm");
    const updated_at = moment().format("YYYY-MM-DDTHH:mm");
    console.log("waa", subjectName)
    connection.query(`select * from classes where classId =  ${classId}`)
        .then(Subjects => {
            connection.query("INSERT INTO subjects(`subjectName`,`classId`,`className`, `created_at`,`updated_at`)VALUES ('"+ subjectName+'-'+Subjects[0].className+"','"+ classId+"','" +Subjects[0].className+ "', '" +created_at+ "', '" +updated_at+ "')")
            .then((result)=>{
                res.json({
                    success: true,
                    data:result
                })
            })
        }
            
        )
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}

export function findAllSubject(req, res){
    connection.query(`select * from subjects`)
    .then(Subjects => res.json({
            error: false,
            data: Subjects
        })
    )
    .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            error: err
        })
    );
}

export function findByIdSubject(req, res) {
    connection.query(`select * from subjects where subjectId =  ${req.params.id}`)
        .then(Subjects => {
            if (!Subjects) {
                res.status(HttpStatus.NOT_FOUND).json({
                    error: true, data: {}
                });
            }
            else {
                res.json({
                    error: false,
                    data: Subjects
                });
            }
        })
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}

export function updateSubject(req, res) {
    const updated_at = moment().format("YYYY-MM-DDTHH:mm");
    const {classId } = req.body;
    connection.query('SELECT * FROM subjects WHERE subjectId = ?',req.params.id)
        .then(Subjects => {
           connection.query(`SELECT * FROM classes WHERE classId = ${classId}`)
           .then((classes)=>{
            const updateObject = {
                subjectName: req.body.subjectName || Subjects[0].subjectName,
                classId: req.body.classId || Subjects[0].classId,
                className: classes[0].className || Subjects[0].className,
                created_at: Subjects[0].created_at,
                updated_at: updated_at
            }
         connection.query(`UPDATE subjects SET ? WHERE subjectId= ${req.params.id}`,updateObject)
                .then((newSubject) => res.json({
                        error: false,
                        data: newSubject
                    })
                )
                .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                        error: true,
                        data: {message: err.message}
                    })
                )
           })
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

export function destroySubject(req, res) {
    connection.query('DELETE FROM subjects WHERE subjectId = ?',req.params.id)
            .then(() => res.json({
                    error: false,
                    data: {message: 'Subject deleted successfully.'}
                })
            )
            .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: true,
                    data: {message: err.message}
                })
            )
}