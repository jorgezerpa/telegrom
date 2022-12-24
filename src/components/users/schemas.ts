import Joi from "joi";

const id = Joi.string()
const name = Joi.string()

const updateUserSchema = Joi.object({
        firstName: name,
        lastName: name,
}) 
    
const addContactSchema = Joi.object({
        contactId: id.required()
}) 

export {updateUserSchema, addContactSchema }
