import express, { Request, Response } from 'express';
import { postChat, getChats } from './controller';
import { successResponse, errorResponse } from '../../network/response';
import { createChatSchema, getChatsSchema } from './schemas'
import validatorHandler from '../../middlewares/validator.handler';

const chat = express.Router();

chat.post('/', validatorHandler(createChatSchema, 'body'), (req, res, next) => {
    try {
        const { users } = req.body;
        successResponse(req, res, postChat(users), 201);
    } catch (error:any) {
        next(error)
    }
});

chat.get('/:userId', validatorHandler(getChatsSchema, 'params'), async(req, res, next) => {
    try {
        const { userId } = req.params;
        let filter = userId ? { users: userId } : {};
        const chat = await getChats(filter)
        successResponse(req, res, chat, 200)
    } catch (error:any) {
        next(error)
    }
});

export default chat;
