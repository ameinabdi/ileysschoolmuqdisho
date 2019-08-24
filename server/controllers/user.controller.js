import bcrypt from 'bcrypt';
import HttpStatus from 'http-status-codes';
import User from '../models/user.model';
import connection from '../config/database'
import moment from 'moment';

/**
 * Find all the users
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function findAll(req, res) {
    // User.forge()
    //     .fetchAll()
    //     .then(user => res.json({
    //             error: false,
    //             data: user.toJSON()
    //         })
    //     )
    //     .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    //             error: err
    //         })
    //     );
}

/**
 *  Find user by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function findById(req, res) {
    // User.forge({id: req.params.id})
    //     .fetch()
    //     .then(user => {
    //         if (!user) {
    //             res.status(HttpStatus.NOT_FOUND).json({
    //                 error: true, data: {}
    //             });
    //         }
    //         else {
    //             res.json({
    //                 error: false,
    //                 data: user.toJSON()
    //             });
    //         }
    //     })
    //     .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    //             error: err
    //         })
    //     );
}

/**
 * Store new user
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function store(req, res) {
    const created_at = moment().format();
    const updated_at = moment().format();
    const {first_name, last_name, email} = req.body;
    const password = bcrypt.hashSync(req.body.password, 10);
    console.log("passowrd", password)
    connection.query("INSERT INTO users(`first_name`, `last_name`, `email`, `password`,`created_at`, `updated_at`)VALUES ('" +first_name+ "', '" + last_name+"','" + email + "','" +password+"','" +created_at+"','" +updated_at +"')")
       .then(user => res.json({
               success: true,
                data: user
       })
        )
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}

/**
 * Update user by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function update(req, res) {
    // User.forge({id: req.params.id})
    //     .fetch({require: true})
    //     .then(user => user.save({
    //             first_name: req.body.first_name || user.get('first_name'),
    //             last_name: req.body.last_name || user.get('last_name'),
    //             email: req.body.email || user.get('email')
    //         })
    //             .then(() => res.json({
    //                     error: false,
    //                     data: user.message
    //                 })
    //             )
    //             .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    //                     error: true,
    //                     data: {message: err.message}
    //                 })
    //             )
    //     )
    //     .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    //             error: err
    //         })
    //     );
}

/**
 * Destroy user by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function destroy(req, res) {
    // User.forge({id: req.params.id})
    //     .fetch({require: true})
    //     .then(user => user.destroy()
    //         .then(() => res.json({
    //                 error: false,
    //                 data: {message: 'User deleted successfully.'}
    //             })
    //         )
    //         .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    //                 error: true,
    //                 data: {message: err.message}
    //             })
    //         )
    //     )
    //     .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    //             error: err
    //         })
    //     );
}