import Joi from "joi";

const id = Joi.string()
const name = Joi.string()
const age = Joi.string()

const createUserSchema = Joi.object({
        name: name.required(),
        age: age.required(),
}) 
    
const getUserSchema = Joi.object({
        id: id.required()
}) 

export { createUserSchema, getUserSchema }
