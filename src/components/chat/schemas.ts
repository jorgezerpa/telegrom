import Joi from "joi";

const id = Joi.string()
const user = Joi.string()
const name = Joi.string()
const users = Joi.array().items(user)

const createChatSchema = Joi.object({
        users: users.required(),
        name: name.required()
}) 

const getChatsSchema = Joi.object({
    userId:id.required()
})

const updateChatSchema = Joi.object({
    name:Joi.string().required()
})

const getChatSchema = Joi.object({
    chatId:id.required()
})

export { createChatSchema, getChatsSchema, getChatSchema, updateChatSchema }
