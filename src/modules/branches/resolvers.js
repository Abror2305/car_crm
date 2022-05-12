import model from "./model.js"
import {UserInputError,ValidationError,ForbiddenError} from 'apollo-server-express'

export default {
    Query:{
        branches: async (_,{branchId,search,sort,sortOption},{token_obj,isAuth}) => {
            if(!isAuth){
                return new ValidationError("Token is invalid")
            }
            const [perm] = await model.checkHavePerm(token_obj.userId,2)
            if(!perm){
                return new ValidationError("You don't have permission to access this data")
            }

            const branches = await model.getBranches(branchId,search,sort,sortOption)
            if(!branches){
                return new ValidationError("Branch not found")
            }
            return branches
        }

    },

    Mutation:{
        addBranch: async (_,{branchName,branchAddress},{token_obj,isAuth}) => {
            try {
                if(!isAuth){
                    return new ValidationError("Token is invalid")
                }
    
                branchName = branchName.trim()
                branchAddress = branchAddress.trim()
    
                if(branchName.length < 3 || branchName.length > 32){
                    return new UserInputError("Branch name must be between 3 and 32 characters")
                }
                if(branchAddress.length < 3 || branchAddress.length > 256){
                    return new UserInputError("Branch address must be between 3 and 256 characters")
                }
    
                const [perm] = await model.checkHavePerm(token_obj.userId,1)
    
                if(!perm){
                    return new ForbiddenError("You don't have permission to add branch")
                }
    
                const [branch] = await model.addBranch(branchName,branchAddress,token_obj.userId)
    
                if(!branch){
                    return new UserInputError("Branch already exists")
                }
    
                return {
                    status: 200,
                    message: "Branch added successfully"
                }
            } catch (error) {
                return new UserInputError(error.message)
            }
        },
        updateBranch: async (_,{branchId,branchName,branchAddress},{token_obj,isAuth}) => {
            try {
                if(!isAuth){
                    return new ValidationError("Token is invalid")
                }

                branchName = branchName.trim()
                branchAddress = branchAddress.trim()
    
                if(branchName.length < 3 || branchName.length > 32){
                    return new UserInputError("Branch name must be between 3 and 32 characters")
                }
                if(branchAddress.length < 3 || branchAddress.length > 256){
                    return new UserInputError("Branch address must be between 3 and 256 characters")
                }

                const [perm] = await model.checkHavePerm(token_obj.userId,4)

                if(!perm){
                    return new ForbiddenError("You don't have permission to update branch")
                }

                const [branch] = await model.updateBranch(branchId,branchName,branchAddress)
                if(!branch){
                    return new UserInputError("Branch not found")
                }
                return {
                    status: 200,
                    message: "Branch updated successfully"
                }

            } catch (error) {
                return new UserInputError(error.message)
            }
        },
        deleteBranch: async (_,{branchId},{token_obj,isAuth}) => {
            try {
                if(!isAuth){
                    return new ValidationError("Token is invalid")
                }

                const [perm] = await model.checkHavePerm(token_obj.userId,3)
                if(!perm){
                    return new ForbiddenError("You don't have permission to delete branch")
                }

                const [branch] = await model.deleteBranch(branchId)
                console.log(branch);
                if(!branch){
                    return new UserInputError("Branch not found")
                }

                return {
                    status: 200,
                    message: "Branch deleted successfully"
                }
                

            } catch (error) {
                return new UserInputError(error.message)
            }
        }
    },
    Branches:{
        branchId: (branch) => branch.branch_id,
        branchName: (branch) => branch.branch_name,
        branchAddress: (branch) => branch.branch_address,
        addedFrom: (branch) => branch.added_from,
        register_in: (branch) => branch.created_at,
    }
}