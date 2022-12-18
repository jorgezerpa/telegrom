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

export const store = {
    addUser,
    readUsers,
}