import { Empty, FullMessage, User } from '../../types'
import { store } from './store'
import boom from '@hapi/boom'

export const postUser = async(user: User):Promise<FullMessage> => {
        const newUser = store.addUser(user)
        if(!newUser) throw boom.badRequest("can't create user.")
        return store.addUser(user);
}

export const getUsers = async(filter: User | Empty ):Promise<FullMessage[]> => {
    const listUsers  = store.readUsers(filter)
    if(!listUsers) throw boom.notFound('users not found')
    return listUsers
}