import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import logger from '../config/winston';
import connection from '../config/database'
import moment from 'moment';
import _ from 'lodash';
import Promise from 'bluebird';
/**
 * Returns jwt token if valid email and password is provided
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function addNewQuestion(req, res) {
    const created_at = moment().format();
    const updated_at = moment().format();

    const { title, subjectId, classId, body, marks } = req.body;
    console.log("waa", title, subjectId, classId, body, marks)
    connection.query(`select * from classes where classId =  ${classId}`, (errClass, classes)=>{
        if(errClass){
           res.json({
               success: false,
               data: errClass
           })
        }else{
            
            connection.query(`select * from subjects where subjectId =  ${subjectId}`, (errSubject, subjects)=>{
                if(errSubject){
                   res.json({
                       success: false,
                       data: errSubject
                   })
                }else{
                    const className = classes[0].className;
                    const subjectName = subjects[0].SubjectName;
                    console.log("waa", className, subjectName)
                    connection.query("INSERT INTO question(`Title`, `SubjectId`, `subjectName`, `ClassId`, `className`, `question`, `marks`, `created_at`, `updated_at`)VALUES ('" +title+ "', '" + subjectId+"','" + subjectName + "','" +classId+"','" +className+"','" + body +"','" +marks+"','" +created_at+"','" +updated_at +"')", (errQuestion, questions)=>{
                        if(errQuestion){
                            res.json({
                                success: false,
                                data: errQuestion
                            })
                        }else{
                            res.json({
                                success: true,
                                data: questions
                            })
                        }
                    })
                }
            })  
        }
    })
    
        
}


let completed = 0;
export function findAllQuestion(req, res){
    //'subjects', JSON_OBJECT(subjectName 'subjects.SubjectName', 'question', JSON_ARRAYAGG(JSON_OBJECT('id',question.Qid, 'title',question.title, 'marks',question.marks,'question',question.question)))) FROM classes INNER JOIN subjects ON classes.classId = subjects.classId  INNER JOIN question ON classes.classId = question.classId GROUP BY classes.classId"
    // SELECT JSON_ARRAY('ID',classId, 'Class',ClassName, JSON_ARRAY('ID',SubjectId,'Name', subjectName,JSON_ARRAY('Title',title, 'Marks',marks,'Question',question))) AS result FROM question GROUP BY Qid"
    var _counter = 0;
    var _values = [];
    connection.query("SELECT * FROM classes ").then((result)=>{
        result.map((items, key)=>{
            connection.query("SELECT * FROM subjects where classId= ?", items.classId).then((subjects)=>{
                const data = { 
                "classId":items.classId,
                "className":items.className,
                "subject":[subjects]}
                 if(++_counter < subjects.length) 
                 _counter++;
                 res.json(_values)

            }).catch((err)=>{
                res.json(err)
            })
            console.log('saasas',items.length)

            if(++_counter < result.length)

        })
    }).catch((err)=>{
        res.json(err)
    })
      
}

export function findByIdQuestion(req, res) {
    connection.query('SELECT * FROM question Where Qid = ?',req.params.id)
        .then(questions => {
            if (!questions) {
                res.status(HttpStatus.NOT_FOUND).json({
                    error: true, data: {}
                });
            }
            else {
                res.json({
                    error: false,
                    data: questions
                });
            }
        })
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}

export function updateQuestion(req, res) {
    const updated_at = moment().format();
    connection.query('SELECT * FROM question Where Qid = ?',req.params.id)
        .then(questions => {
            if(questions){
                const updateObject = {
                    Title : req.body.title || questions[0].Title  ,
                    SubjectId :req.body.subjectId || questions[0].subjectId, 
                    subjectName : questions[0].subjectName,
                    ClassId : req.body.classId || questions[0].classId,
                    className: questions[0].className,
                    question : req.body.body || questions[0].body , 
                    marks : req.body.marks || questions[0].marks, 
                    created_at: questions[0].created_at,
                    updated_at: updated_at
                }
                connection.query(`UPDATE question SET ? WHERE Qid= ${req.params.id}`,updateObject)
                    .then((results) => res.json({
                            error: false,
                            data: questions[0].subjectName
                        })
                    )
                    .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                            error: true,
                            data: {message: err.message}
                        })
                    )
            }else{
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: true,
                    data: {message: 'errors'}
                })
            }
        }
        )
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}

export function destroyQuestion(req, res) {
    connection.query('DELETE FROM question WHERE Qid = ?',req.params.id)
     .then(() => res.json({
                    error: false,
                    data: {message: 'User deleted successfully.'}
                })
            )
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}