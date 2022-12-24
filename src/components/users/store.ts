import { Empty, User } from '../../types';
import { Model } from './model'

const addUser = async(user: User) => {
    const User = new Model(user);
    await User.save();
    return User;
}

const readUsers = async(user: User | Empty) => {
    const listUsers =  await Model.findOne(user).populate('contacts');
    return listUsers;
}

const readUser = async(id: string) => {
    const User =  await Model.findOne({ _id: id });
    return User;
}

const updateUser = async(id:string, changes:any) => {
    const user =  await Model.findOne({ authId:id });
    if(!user) throw 'user not found'
    const changesToPass = {...user.toObject(), ...changes}
    const updatedUser =  await Model.updateOne({authId:id }, changesToPass);
    return changesToPass;
}

const deleteUser = async(id:string) => {
    const result =  await Model.deleteOne({authId:id});
    return result;
}

const addContact = async(id:string, contactId:string) => {
    const user =  await Model.findOne({ authId:id });
    if(!user) throw new Error('user not found')
    const updatedContacts =  await Model.updateOne({authId:id }, { contacts: [...user.contacts, contactId ] });
    return updatedContacts;
}

const removeContact = async(authId:string, contactId:string) => {
    const user =  await Model.findOne({ authId:authId });
    if(!user) throw new Error('user not found')
    const newContacts = user.contacts.filter((contact:string)=>contact!=contactId)
    const updatedContacts =  await Model.updateOne({ authId:authId }, { contacts: newContacts });
    return updatedContacts;
}

export const store = {
    addUser,
    readUsers,
    readUser,
    updateUser,
    deleteUser,
    addContact,
    removeContact,
}