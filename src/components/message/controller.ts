import { store } from './store';
import { Empty, FullMessage, TheChat } from '../../types';
import boom from '@hapi/boom'

// 🕹️
export const addMessage = async(chat: string, user: string, message: string, fileUrl: string): Promise<FullMessage> => {
    const fullMessage: FullMessage = {
        chat,
        user,
        message,
        date: new Date(),
        file: fileUrl,
    };
    const newMessage = await store.add(fullMessage) 
    if(!newMessage) throw boom.badRequest("can't create message.") 
    return newMessage
};

export const readMessages = async(chat: TheChat | Empty): Promise<string> => {
    const messages = await store.readAll(chat)
    if(!messages) throw boom.notFound('messages not found')
    return messages
};

export const patchMessage = async(id: number | string, text: string): Promise<string> => {
    const updatedMessage = store.patchOne(id, text)
    if(!updatedMessage) throw boom.badRequest("can't update message")
    return updatedMessage
};

export const deleteMessage = async(id: number | string): Promise<string> => {
    const result = store.deleteOne(id)
    if(!result) throw boom.badRequest("can't delete message")
    return result 
};
