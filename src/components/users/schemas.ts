import Joi from "joi";

const id = Joi.string()
const name = Joi.string()
const age = Joi.number()

const createUserSchema = Joi.object({
        name: name.required(),
        age: age.required(),
})

const updateUserSchema = Joi.object({
        name: name,
        age: age,
}) 
    
const getUserSchema = Joi.object({
        id: id.required()
}) 

const addContactSchema = Joi.object({
        contactId: id.required()
}) 

export { createUserSchema, getUserSchema, updateUserSchema, addContactSchema }
