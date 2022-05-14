import model from "./model.js"
import {ValidationError,ForbiddenError} from 'apollo-server-express'
export default {
    PermissionModule:{
        Transports : 1,
        Branches : 2,
        Permissions : 3
    },
    PermissionEnum:{
        Create:1,
        Read:2,
        Delete:3,
        Update:4,
    },
    Permission:{
        upId: global => global.up_id,
        userId: global => global.user_id,
        userName: global => global.user_name,
        branchId: global => global.branch_id,
        branchName: global => global.branch_name,
        permission: global => global.permission_name,
        permissionModule: global => global.permission_module_name,
        addedFromId: global => global.added_from,
        addedFromName: global => global.added_from_user,
        createdAt: global => global.created_at,
    },
    Query:{
        myPermisions: async (_,__,{token_obj,isAuth}) => {
            if(!isAuth) throw new ForbiddenError('Invalid token')
            const userId = token_obj.userId
            const permissions = await model.myPermissions(userId)
            if(permissions.length === 0) throw new ForbiddenError('Permission not found')
            return permissions
        },
        allPermissions: async (_,{userId,branchId,branchName,userName,sort,sortOption},{token_obj,isAuth}) => {
            if(!isAuth) throw new ForbiddenError('Invalid token')
            const permissions = await model.allPermissions(token_obj.userId,userId,branchId,userName,branchName,sort,sortOption)
            if(permissions.length === 0) throw new ForbiddenError('Permission not found or you don\'t have permission to see it')
            return permissions
        }

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
            const [check_exists] = await model.check_exists(userId,branchId,permission,permissionModule)
            if(check_exists){
                return new ForbiddenError("Permission already exists")
            } 
            const [addPerm] = await  model.addPerm(userId,branchId,permission,permissionModule,perm.user_id)
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
            
            const [perm] = await model.checkPerm(token_obj.userId,branch.branch_id,3)
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