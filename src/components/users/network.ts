import express, { Request, Response } from 'express'
import { postUser, getUser, updateUser, deleteUser, addContact, removeContact } from './controller'
import { successResponse } from '../../network/response'
import { updateUserSchema, addContactSchema } from './schemas'
import validatorHandler from '../../middlewares/validator.handler';

const users = express.Router();

//TO SCAPE THIS ROUTE TO THE AUTH MIDDLEWARE
export const createUserClosure = () => {
    return users.post('/', async (req, res, next) => {
        try{
            const {name, age} = req.body;
            const user = {name, age};
            const postedUser = await postUser(user);
            successResponse(req, res, postedUser, 201);
        }catch(error:any){
            next(error)
        }
    });
}

//get user
users.get('/', async(req, res, next) => {
    try{
        //@ts-ignore
        const authId = req.auth.payload.sub.split('|')[1]
        const filter = authId ? {authId} :{};
        const theUsers = await getUser(filter);
        successResponse(req, res, theUsers, 200);
    }catch(error:any){
        next(error)
    }
})

users.patch('/updateUser', validatorHandler(updateUserSchema, 'body'), async(req, res, next) => {
    try{
        //@ts-ignore
        const authId = req.auth.payload.sub.split('|')[1]
        const changes = req.body
        const theUsers = await updateUser(authId, changes);
        successResponse(req, res, theUsers, 200);
    }catch(error:any){
        next(error)
    }
})

users.delete('/deleteUser', async(req, res, next) => {
    try{
        //@ts-ignore
        const authId = req.auth.payload.sub.split('|')[1]
        const theUsers = await deleteUser(authId);
        successResponse(req, res, theUsers, 200);
    }catch(error:any){
        next(error)
    }
})

users.patch('/addContact/:contactId', validatorHandler(addContactSchema, 'params'), validatorHandler(updateUserSchema, 'body'), async(req, res, next) => {
    try{
        //@ts-ignore
        const authId = req.auth.payload.sub.split('|')[1]
        const { contactId } = req.params;
        const result = await addContact(authId, contactId);
        successResponse(req, res, result, 200);
    }catch(error:any){
        next(error)
    }
})

users.patch('/removeContact/:contactId', validatorHandler(addContactSchema, 'params'), validatorHandler(updateUserSchema, 'body'), async(req, res, next) => {
    try{
        //@ts-ignore
        const authId = req.auth.payload.sub.split('|')[1]
        const { contactId } = req.params;
        const result = await removeContact(authId, contactId);
        successResponse(req, res, result, 200);
    }catch(error:any){
        next(error)
    }
})

export default users;
