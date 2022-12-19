import { Empty, FullMessage, User } from '../../types'
import { store } from './store'
import boom from '@hapi/boom'

export const postUser = async(user: User):Promise<FullMessage> => {
        const newUser = store.addUser(user)
        if(!newUser) throw boom.badRequest("can't create user.")
        return newUser;
}

export const getUsers = async(filter: User | Empty ):Promise<FullMessage[]> => {
    const listUsers  = store.readUsers(filter)
    if(!listUsers) throw boom.notFound('users not found')
    return listUsers
}

export const updateUser = async(id:string, changes:any ):Promise<FullMessage[]> => {
    const listUsers  = store.updateUser(id, changes)
    if(!listUsers) throw boom.badRequest('can not update user')
    return listUsers
}

export const deleteUser = async(id:string ) => {
    const result  = await store.deleteUser(id)
    if(!result || result.n<=0) throw boom.notFound('users not found')
    return 'user '+ id + ' deleted'
}