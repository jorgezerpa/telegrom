import { Schema, model } from 'mongoose'

const mySchema = new Schema({
    authId: String,
    firstName: String,
    lastName: String,
    email:String,
    
    contacts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'users',
        },
    ],
}, {collection: 'users'})

export const Model = model('users', mySchema);
