import Joi from "joi";

const id = Joi.string()
const user = Joi.string()
const users = Joi.array().items(user)

const createChat = Joi.object({
        users: users.required()
}) 

const getChats = Joi.object({
    id:id.required()
})

export { createChat, getChats }
