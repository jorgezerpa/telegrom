import { Empty, User, Users } from '../../types';
import { Model } from './model';

const addChat = async(chat: Users) => {
    const Chat = new Model(chat);
    const newChat = await Chat.save();
    return newChat;
};

const getChat = async(userId: Empty | { users: string }) => {
    const chat = await Model.find(userId).populate('users').exec();
    return chat;
};

export const store = {
    addChat,
    getChat,
};
