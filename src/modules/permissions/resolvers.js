import model from "./model.js"
import {ValidationError,ForbiddenError} from 'apollo-server-express'
export default {
    PermissionModule:{
        Transports : 1,
        Branches : 2,
        Permissions : 3
    },
    Permission:{
        Create:1,
        Read:2,
        Write:3,
        Delete:4
    },
    Mutation: {
        addPermission: async(_,{userId, branchId, permissionModule, permission},{token_obj,userAgent,isAuth}) => {
            if(!isAuth){
                return new ValidationError("Token is invalid")
            }
            
            const [perm] = await model.checkPerm(token_obj.userId,branchId,1)
            if(!perm){
                return new ForbiddenError("You have not accses to addPermission")
            }

            const [addPerm] =await  model.addPerm(userId,branchId,permission,permissionModule,perm.user_id)
            if(!addPerm){
                return {
                    status:400,
                    message: "Error"
                }
            }
            return {
                status:200,
                message: "Permission added"
            }
        },


        deletePermission: async(_,{up_id},{token_obj,isAuth}) => {
            console.log(token_obj);
            if(!isAuth){
                return new ValidationError("Token is invalid")
            }

            const [branch] = await model.selectBranch(up_id)

            if(!branch){
                return {
                    status:400,
                    message: "Invalid up_id or permission already deleted"
                }
            }
            
            const [perm] = await model.checkPerm(token_obj.userId,branch.branch_id,4)
            if(!perm){
                return new ForbiddenError("You have not accses to deletePermission")
            }
            
            const [delPerm] = await model.delPerm(up_id)
            return {
                status:200,
                message: "Permission Deleted"
            }
        }
    }
}