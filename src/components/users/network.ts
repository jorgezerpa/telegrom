import express, { Request, Response } from 'express'
import { postUser, getUsers, updateUser, deleteUser, addContact, removeContact } from './controller'
import { successResponse } from '../../network/response'
import { createUserSchema, getUserSchema, updateUserSchema, addContactSchema } from './schemas'
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

users.patch('/addContact/:contactId', validatorHandler(addContactSchema, 'params'), validatorHandler(updateUserSchema, 'body'), async(req, res, next) => {
    try{
        const id = '63a071200242e0889d3c55f2' //should come with the auth middleware. Harcoded by know to test
        const { contactId } = req.params;
        const result = await addContact(id, contactId);
        successResponse(req, res, result, 200);
    }catch(error:any){
        next(error)
    }
})

users.patch('/removeContact/:contactId', validatorHandler(addContactSchema, 'params'), validatorHandler(updateUserSchema, 'body'), async(req, res, next) => {
    try{
        const id = '63a071200242e0889d3c55f2' //should come with the auth middleware. Harcoded by know to test
        const { contactId } = req.params;
        const result = await removeContact(id, contactId);
        successResponse(req, res, result, 200);
    }catch(error:any){
        next(error)
    }
})

export default users;
