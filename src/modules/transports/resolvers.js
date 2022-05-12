import model from "./model.js"
import {ValidationError,ForbiddenError} from 'apollo-server-express'
export default {
    Mutation:{
        addTransport: async (_,{transportName,transportImg,branchId,transportColor},{token_obj,isAuth}) => {
            if(!isAuth){
                return new ValidationError("Token is invalid")
            }
            const [perm] = await model.checkPerm(token_obj.userId,branchId,2)
            if(!perm){
                return new ForbiddenError("You have not accses to addTransport")
            }
            const {createReadStream, filename, mimetype} = await transportImg
            console.log(filename,mimetype);
            
        }
    }
}