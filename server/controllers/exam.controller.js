import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import logger from '../config/winston';
import connection from '../config/database'
import moment from 'moment';
import _ from 'lodash';
import Promise from 'bluebird';
import shape from 'shape-json';

/**
 * Returns jwt token if valid email and password is provided
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function create(req, res) {
    const created_at = moment().format("YYYY-MM-DDTHH:mm");
    const updated_at = moment().format("YYYY-MM-DDTHH:mm");

    const { body } = req.body;
    let data = []
    body.map((items) => {
        connection.query("truncate exams", (ErrDelete, Delete) => {
            if (ErrDelete) {
                res.json({
                    success: false,
                    data: ErrDelete
                })
            } else {
                connection.query(`select * from question where Qid =  ${items.id}`, (errQuestion, Questions) => {
                    if (errQuestion) {
                        res.json({
                            success: false,
                            data: errQuestion
                        })
                    } else {
                        console.log("hello", items.id, Questions)

                        connection.query("INSERT INTO exams(`examtitle`, `classId`, `className`, `subjectId`, `subjectName`, `questionId`,`question`, `questiontitle`,`questionmarks`,`created_at`, `updated_at`)VALUES ('" + created_at + "', '" + Questions[0].ClassId + "','" + Questions[0].className + "','" + Questions[0].SubjectId + "','" + Questions[0].subjectName + "','" + items.id + "','" + Questions[0].question + "','" + Questions[0].Title + "','" + Questions[0].marks + "','" + created_at + "','" + updated_at + "')", (errExam, exams) => {
                            if (errExam) {
                                res.json({
                                    success: false,
                                    data: errExam
                                })
                            } else {
                                items++
                                data.push(Questions)
                            }
                        })

                    }
                })
            }
        })
    })
    res.json({
        success: true,
        data: data
    })

}

