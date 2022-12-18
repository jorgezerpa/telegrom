import express, { Request, Response } from 'express'
import { postUser, getUsers } from './controller'
import { successResponse, errorResponse } from '../../network/response'
import { createUserSchema } from './schemas'
import validatorHandler from '../../middlewares/validator.handler';

const users = express.Router();

users.post('/', validatorHandler(createUserSchema, 'body'), async (req, res, next) => {
    try{
        const {name, age} = req.body;
        const user = {name, age};
        const postedUser = await postUser(user);
        successResponse(req, res, postedUser, 201);
    }catch(error:any){
        next(error)
    }
});

users.get('/', async(req, res, next) => {
    try{
        const { name: user } = req.query;
        const filter = user ?{ name: user} :{};
        const theUsers = await getUsers(filter);
        successResponse(req, res, theUsers, 200);
    }catch(error:any){
        next(error)
    }
})

export default users;
