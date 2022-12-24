import express, { Request, Response } from 'express';
import { registerUser } from './controller';
import { successResponse } from '../../network/response';

const Router = express.Router();

Router.post('/register', async(req, res, next) => {
    try {
        const newUserData = req.body
        const result = await registerUser(newUserData)
        successResponse(req, res, result, 200)
        
    } catch (error:any) {
        next(error)
    }
});

export default Router;
