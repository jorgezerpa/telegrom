import express, { Request, Response } from 'express';
import { postChat, getChat } from './controller';
import { successResponse, errorResponse } from '../../network/response';
import { createChat, getChats } from './schemas'
import validatorHandler from '../../middlewares/validator.handler';

const chat = express.Router();

chat.post('/', validatorHandler(createChat, 'body'), (req, res, next) => {
    try {
        const { users } = req.body;
        successResponse(req, res, postChat(users), 201);
    } catch (error:any) {
        next(error)
    }
});

chat.get('/:userId', validatorHandler(getChats, 'params'), async(req, res, next) => {
    try {
        const { userId } = req.params;
        let filter = userId ? { users: userId } : {};
        const chat = await getChat(filter)
        successResponse(req, res, chat, 200)
    } catch (error:any) {
        next(error)
    }
});

export default chat;
