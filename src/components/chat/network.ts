import express, { Request, Response } from 'express';
import { postChat, getChat } from './controller';
import { successResponse, errorResponse } from '../../network/response';

const chat = express.Router();

chat.post('/', (req, res) => {
    try {
        const { users } = req.body;
        successResponse(req, res, postChat(users), 201);
    } catch (error:any) {
        errorResponse(req, res, error.message, 500);
    }
});

chat.get('/:userId', async(req, res) => {
    try {
        const { userId } = req.params;
        let filter = userId ? { users: userId } : {};
        const chat = await getChat(filter)
        successResponse(req, res, chat, 200)
    } catch (error:any) {
        console.log(error)
        errorResponse(req, res, error.message, 500)
    }
});

export default chat;
