import { Schema, model } from 'mongoose'

const mySchema = new Schema({
    name: String,
    age: Number,
    contacts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'users',
        },
    ],
}, {collection: 'users'})

export const Model = model('users', mySchema);
