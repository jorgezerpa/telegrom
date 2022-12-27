import express, { Request, Response } from 'express';
import multer from 'multer';
import { addMessage, readMessages, patchMessage, deleteMessage } from './controller';
import { successResponse } from '../../network/response';
import { addMessageSchema, deleteMessageSchema, updateMessageSchema, getMessageSchema, getMessagesSchema } from './schemas'
import validatorHandler from '../../middlewares/validator.handler';

const messages = express.Router();
const upload = multer({
    dest: 'public/files',
});

// 🕸️
messages.get('/', validatorHandler(getMessagesSchema, 'query'), async (req: Request, res: Response, next) => {
    try {
        const { chat } = req.query;
        const data = chat ? { chat: chat } : {};
        const allMessages = await readMessages(data);
        successResponse(req, res, allMessages, 201);
    } catch (error:any) {
        next(error)
    }
});

// 🕸️
messages.post('/', upload.single('file'), validatorHandler(addMessageSchema, 'body'), async (req: Request, res: Response, next) => {
    try {
        const { chat, user, message } = req.body;
        const fileUrl = req.file ? `http://localhost:3000/app/files/${req.file.filename}` : '';
        const fullMessage = await addMessage(chat, user, message, fileUrl);
        successResponse(req, res, fullMessage, 201);
    } catch (error:any) {
        next(error)
    }
});

// 🕸️
messages.patch('/:id',validatorHandler(getMessageSchema, 'params'),validatorHandler(updateMessageSchema, 'body'), async (req: Request, res: Response, next) => {
    try {
        const { id } = req.params;
        const { message: text } = req.body;
        const newMessage = await patchMessage(id, text);
        successResponse(req, res, newMessage, 200);
    } catch (error:any) {
        next(error)
    }
});

// 🕸️
messages.delete('/:id',validatorHandler(deleteMessageSchema, 'params'), async (req: Request, res: Response, next) => {
    try {
        const { id } = req.params;
        const deletedMessage = await deleteMessage(id);
        successResponse(req, res, `${deletedMessage} [DELETED] `, 200);
    } catch (error:any) {
        next(error)
    }
});

export default messages;
