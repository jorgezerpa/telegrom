import { Empty, User, Users } from '../../types';
import { Model } from './model';

type Chat = { users: any[], name:string }

const addChat = async(chat: Chat) => {
    const Chat = new Model(chat);
    const newChat = await Chat.save();
    return newChat;
};

const getChats = async(userId: Empty | { users: string }) => {
    const chats = await Model.find(userId).populate('users').exec();
    return chats;
};

const getChat = async(chatId: Empty | { _id: string  }) => {
    const chat = await Model.findOne(chatId).populate('users').exec();
    return chat;
};

const updateChat = async(chatId:string, changes:any) => {
    const result = await Model.updateOne({_id:chatId}, changes)
    return result;
};

const addToChat = async(chatId: string, usersId: string[]) => {
    const  result = await Model.updateOne({_id:chatId}, { users:usersId })
    return result
}

const removeFromChat = async(chatId: string, userId: string) => {
    const chat = await Model.findOne({_id:chatId}).populate('users').exec();
    const users = chat.users;
    const userDeleted = users.filter((user:any)=>{return user._id != userId})
    const  result = await Model.updateOne({_id:chatId}, { users:userDeleted })
    return result
}

export const store = {
    addChat,
    getChats,
    getChat,
    addToChat,
    removeFromChat,
    updateChat
};
