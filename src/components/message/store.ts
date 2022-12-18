import { Empty, FullMessage, TheChat } from '../../types';
import { Model } from './model';

//✅
const addMessage = async(message: FullMessage) => {
    const Message = new Model(message);
    const newMessage = await Message.save()
    return newMessage
};
//✅
const readMessages = async(theChat: Empty | TheChat) => {
        const allMessages = await Model.find(theChat).populate('chat').populate('user').exec();
        return allMessages;
};

const patchMessage = async(id: number | string, message: string) => {
    const foundMessage = await Model.findOne({ _id: id });
    foundMessage.message = message;
    const newMessage = await foundMessage.save();
    return newMessage
};
//✅
const deleteMessage = async (id: number | string) => {
    const message = await Model.findOne({ _id: id });
    const deletedMessage = message.message;
    await Model.deleteOne({ _id: id });

    return deletedMessage;
};

export const store = {
    add: addMessage,
    readAll: readMessages,
    patchOne: patchMessage,
    deleteOne: deleteMessage,
};
