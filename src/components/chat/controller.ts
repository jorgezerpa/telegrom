import { Empty, Users } from '../../types';
import { store } from './store';
import boom from '@hapi/boom'

export const postChat = async(users: string[]): Promise<Users> => {
    const chat = {
        users,
    };
    const newChat = await store.addChat(chat)
    if(!newChat) throw boom.badRequest("can't create new chat")
    return newChat;
};

export const getChats = async (userId: Empty | { users: string }) => {
    const chat = await store.getChat(userId);
    if(!chat || chat.length<=0 ) throw boom.notFound('chats not found')
    return chat
};

export const addUsersToChat = async (chatId: string, usersId: string[]) => {
    const result = await store.addToChat(chatId, usersId);
    if(!result || result.length<=0 ) throw boom.notFound('chat not found')
    const updatedChat = await store.getChat({ _id:chatId });
    return updatedChat
};

export const removeUserFromChat = async (chatId: string, userId: string) => {
    const result = await store.removeFromChat(chatId, userId);
    if(!result || result.length<=0 ) throw boom.notFound('chat not found')
    const updatedChat = await store.getChat({ _id:chatId });
    return updatedChat
};
