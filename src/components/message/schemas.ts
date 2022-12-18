import Joi from "joi";

const id = Joi.string()
const chat = Joi.string()
const user = Joi.string()
const message = Joi.string()


const addMessageSchema = Joi.object({
        chat:chat.required(),
        user:user.required(),
        message:message.required(),
}) 

const deleteMessageSchema = Joi.object({
        id:id.required()
    }) 
    
const updateMessageSchema = Joi.object({
        chat:chat,
        user:user,
        message:message,
}) 

const getMessageSchema = Joi.object({
        id:id.required()
}) 

const getMessagesSchema = Joi.object({
        chat: chat.required()
}) 

export { addMessageSchema, deleteMessageSchema, updateMessageSchema, getMessageSchema, getMessagesSchema }
