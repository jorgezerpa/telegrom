import { Empty, User } from '../../types';
import { Model } from './model'

const addUser = async(user: User) => {
    const User = new Model(user);
    await User.save();
    return User;
}

const readUsers = async(user: User | Empty) => {
    const listUsers =  await Model.find(user).populate('contacts');
    return listUsers;
}

const readUser = async(id: string) => {
    const User =  await Model.findOne({ _id: id });
    return User;
}

const updateUser = async(id:string, changes:any) => {
    const user =  await Model.findOne({ _id:id });
    if(!user) throw 'user not found'
    const changesToPass = {...user.toObject(), ...changes}
    const updatedUser =  await Model.updateOne({_id:id }, changesToPass);
    return changesToPass;
}

const deleteUser = async(id:string) => {
    const result =  await Model.deleteOne({_id:id});
    return result;
}

const addContact = async(id:string, contactId:string) => {
    const user =  await Model.findOne({ _id:id });
    if(!user) throw new Error('user not found')
    const updatedContacts =  await Model.updateOne({_id:id }, { contacts: [...user.contacts, contactId ] });
    return updatedContacts;
}

const removeContact = async(id:string, contactId:string) => {
    const user =  await Model.findOne({ _id:id });
    if(!user) throw new Error('user not found')
    const newContacts = user.contacts.filter((contact:string)=>contact!=contactId)
    const updatedContacts =  await Model.updateOne({_id:id }, { contacts: newContacts });
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