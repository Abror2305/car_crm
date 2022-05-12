import Joi from "joi"

export const registerSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,30}$/).required(),
    repeatPassword: Joi.ref("password"),
    gender: Joi.number().integer().greater(0).less(3).required(),
    birthDate: Joi.date()
})
