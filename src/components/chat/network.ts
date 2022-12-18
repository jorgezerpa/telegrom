import express, { Request, Response } from 'express';
import { postChat, getChats, addUsersToChat, removeUserFromChat } from './controller';
import { successResponse } from '../../network/response';
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

chat.post('/addUser/:chatId', async(req, res, next) => {
    try {
        const { users } = req.body;
        const { chatId } = req.params;
        const result = await addUsersToChat(chatId, users)
        successResponse(req, res, result, 200)
    } catch (error:any) {
        next(error)
    }
});

chat.patch('/removeUser/:chatId/:userId', async(req, res, next) => {
    try {
        const { userId, chatId } = req.params;
        const result = await removeUserFromChat(chatId, userId)
        successResponse(req, res, result, 200)
    } catch (error:any) {
        next(error)
    }
});



export default chat;
