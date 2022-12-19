import express, { Request, Response } from 'express'
import { postUser, getUsers, updateUser, deleteUser } from './controller'
import { successResponse } from '../../network/response'
import { createUserSchema, getUserSchema, updateUserSchema } from './schemas'
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

//get users
users.get('/', async(req, res, next) => {
    try{
        const { id: _id } = req.query;
        const filter = _id ? {_id} :{};
        const theUsers = await getUsers(filter);
        successResponse(req, res, theUsers, 200);
    }catch(error:any){
        next(error)
    }
})

users.patch('/updateUser/:id', validatorHandler(getUserSchema, 'params'), validatorHandler(updateUserSchema, 'body'), async(req, res, next) => {
    try{
        const { id } = req.params;
        const changes = req.body
        const theUsers = await updateUser(id, changes);
        successResponse(req, res, theUsers, 200);
    }catch(error:any){
        next(error)
    }
})

users.delete('/deleteUser/:id', validatorHandler(getUserSchema, 'params'), async(req, res, next) => {
    try{
        const { id } = req.params;
        const theUsers = await deleteUser(id);
        successResponse(req, res, theUsers, 200);
    }catch(error:any){
        next(error)
    }
})

export default users;
