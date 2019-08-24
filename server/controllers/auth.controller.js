import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.model';
import logger from '../config/winston';
import connection from '../config/database'

/**
 * Returns jwt token if valid email and password is provided
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function login(req, res) {
    const {email, password} = req.body;
    connection.query('SELECT * FROM users WHERE email = ?',email)
    .then(user => {
        if (user) {
            if (bcrypt.compareSync(password, user[0].password) ) {

                const token = jwt.sign({
                    id: user[0].id,
                    email: user[0].email
                }, process.env.TOKEN_SECRET_KEY);

                res.json({
                    success: true,
                    token,
                    data: {
                        first_name: user[0].first_name,
                        last_name: user[0].last_name,
                        email: user[0].email,
                        
                    }
                });
            } else {
                logger.log('error', 'Authentication failed. Invalid password.');

                res.status(HttpStatus.UNAUTHORIZED).json({
                    success: false,
                    message: 'Authentication failed. Invalid password.'
                });
            }
        } else {
            logger.log('error', 'Invalid username or password.');

            res.status(HttpStatus.UNAUTHORIZED).json({
                success: false, message: 'Invalid username or password.'
            });
        }
    });
}