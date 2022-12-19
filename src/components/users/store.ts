import { Empty, User } from '../../types';
import { Model } from './model'

const addUser = async(user: User) => {
    const User = new Model(user);
    await User.save();
    return User;
}

const readUsers = async(user: User | Empty) => {
    const listUsers =  await Model.find(user);
    return listUsers;
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

export const store = {
    addUser,
    readUsers,
    updateUser,
    deleteUser
}