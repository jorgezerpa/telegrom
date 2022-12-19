import Joi from "joi";

const id = Joi.string()
const user = Joi.string()
const users = Joi.array().items(user)

const createChatSchema = Joi.object({
        users: users.required()
}) 

const getChatsSchema = Joi.object({
    userId:id.required()
})

const getChatSchema = Joi.object({
    chatId:id.required()
})

export { createChatSchema, getChatsSchema, getChatSchema }
