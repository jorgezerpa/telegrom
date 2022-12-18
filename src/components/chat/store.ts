import { Empty, User, Users } from '../../types';
import { Model } from './model';

const addChat = async(chat: Users) => {
    const Chat = new Model(chat);
    const newChat = await Chat.save();
    return newChat;
};

const getChat = async(userId: Empty | { users: string|null, _id:string|null  }) => {
    const chat = await Model.find(userId).populate('users').exec();
    return chat;
};

const addToChat = async(chatId: string, usersId: string[]) => {
    const  result = await Model.updateOne({_id:chatId}, { users:usersId })
    return result
}

const removeFromChat = async(chatId: string, userId: string) => {
    const chat = await Model.findOne({_id:chatId}).populate('users').exec();
    const users = chat.users;
    const userDeleted = users.filter((user:any)=>{return user._id != userId})
    console.log('cahahadfash---->', userDeleted)
    const  result = await Model.updateOne({_id:chatId}, { users:userDeleted })
    return result
}

export const store = {
    addChat,
    getChat,
    addToChat,
    removeFromChat
};
