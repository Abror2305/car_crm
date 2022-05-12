import model from "./model.js"
import jwt from 'jsonwebtoken';
import {secret_key,expiresIn} from '#config/index';
import {registerSchema} from '../../util/validation.js'
import {UserInputError} from 'apollo-server-express'
export default {
    gender:{
        male:1,
        female:2
    },
    Query:{
        user: () => 'user'
    },
    Mutation:{
        login:async (_,{input:{username,password}},{userAgent}) => {
            try {
                username = username.trim()
                const [user] = await model.login(username,password)
    
                if(!user){
                    return {
                        status:400,
                        message: "Invalid username or password"
                    }
                }
                const token = jwt.sign({
                    userId: user.user_id,
                    userAgent,
                },
                secret_key,{expiresIn})
    
                return {
                    status:200,
                    message: "ok",
                    token,
                } 
            } catch (error) {
                return UserInputError(error.message)
            }
            
        },
        register: async(_,{input:{username,password,branchId,repeatPassword,gender,birthDate}},{userAgent}) => {
            try {
                username = username.trim()

                const {error} = registerSchema.validate({username,password, repeatPassword,gender,birthDate})

                if (error) {
                    return {
                        status: 400,
                        message: error.message,
                    }
                }
                const [branch] = await model.branchAuth(branchId)
                if(!branch){
                    return {
                        status:400,
                        message: "Branch not found"
                    }
                }

                const [user] = await model.register(username,password,gender,birthDate)
                const token = jwt.sign({
                    userId: user.user_id,
                    userAgent,
                },
                secret_key,{expiresIn})
                return {
                    status:200,
                    message: "ok",
                    token,
                }
            } catch (error) {
                return new UserInputError(error.message)
            }
        }
    }
}