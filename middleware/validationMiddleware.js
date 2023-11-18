import { body, param, validationResult } from 'express-validator';
import { BadRequestError, NotFoundError } from '../errors/customErrors.js';
import { JOB_STATUS, JOB_TYPE } from '../utils/constants.js';
import mongoose from 'mongoose';
import Job from '../models/JobModel.js';
import User from '../models/UserModel.js'

// this is express.js code to validate errors
// this is something we can use from project to project
// now we wont touch this, only touch the export conditions by putting values. 
const withValidateErrors = (validateValues) => {
    return [
        validateValues, (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log(errors);
                const errorMessages = errors.array().map((error) => error.msg);
                if (errorMessages[0].startsWith('No job')) {
                    throw new NotFoundError(errorMessages);
                }
                throw new BadRequestError(errorMessages);
            }
            next();
        },
    ];
}

export const validateJobInput = withValidateErrors([
    body('company').notEmpty().withMessage('company is required'),
    body('position').notEmpty().withMessage('position is required'),
    body('jobLocation').notEmpty().withMessage('job location is required'),
    body('jobStatus').isIn(Object.values(JOB_STATUS)).withMessage('invalid status value'),
    body('jobType').isIn(Object.values(JOB_TYPE)).withMessage('invalid job type value'),
])

export const validateIdParam = withValidateErrors([
    param('id').custom((value) => {
        return true;
    })
        // with the below line we check if the id is in the mongodb or not
        .custom(async (value) => {
            // we will need to do this manually because it is an async function
            const isValidMongoId = mongoose.Types.ObjectId.isValid(value);
            if (!isValidMongoId) throw new BadRequestError('invalid MongoDB id');
            const job = await Job.findById(value);
            if (!job) throw new NotFoundError(`No job with id ${value}`);
        })
]);

export const validateRegisterInput = withValidateErrors([
    body('name').notEmpty().withMessage('name is required'),
    body('email').notEmpty().withMessage('email is required').isEmail().withMessage('invalid email format').custom(async (email) => {
        const user = await User.findOne({ email })
        if (user) {
            throw new BadRequestError('email already exists');
        }
    }),
    body('password').notEmpty().withMessage('password is required').isLength({ min: 8 }).withMessage('password must be at least 8 characters long'),
    body('location').notEmpty().withMessage('location is required'),
    body('lastName').notEmpty().withMessage('last name is required'),
]);


export const validateLoginInput = withValidateErrors([
    body('email').notEmpty().withMessage('email is required').isEmail().withMessage('invalid email format'),
    body('password').notEmpty().withMessage('password is required'),
]);