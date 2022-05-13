import model from "./model.js"
import {ValidationError,ForbiddenError} from 'apollo-server-express'
import {finished} from "stream/promises"
import fs from 'fs'

export default {
    Transports: {
        transportId: global => global.transport_id,
        transportName: global => global.transport_name,
        transportColor: global => global.transport_color,
        transportImg: global => global.transport_img,
        branchId: global => global.branch_id,
        addedFrom: global => global.added_from,
        createdAt: global => global.created_at
    },
    Query:{
        transports: async (_,{branchId,search,sort,sortOption},{token_obj,isAuth})=>{
            if(!isAuth) throw new ForbiddenError('Invalid token')
            const transports = await model.getTransports(token_obj.userId,branchId,search,sort,sortOption)
            if(transports.length === 0){
                return new ValidationError('No transports found or you do not have permission to view them')
            }
            return transports
        }
    },

    Mutation:{
        addTransport: async (_,{transportName,transportImg,branchId,transportColor},{token_obj,isAuth}) => {
            if(!isAuth){
                return new ValidationError("Token is invalid")
            }
            const [perm] = await model.checkPerm(token_obj.userId,branchId,1)
            if(!perm){
                return new ForbiddenError("You have not accses to addTransport")
            }
            const {createReadStream, filename, mimetype} = await transportImg
            console.log(filename,mimetype);

            if (!['image/png', 'image/jpg', 'image/jpeg'].includes(mimetype)) {
                return {
                    status: 400,
                    message: 'Invalid mime type for transport image!'
                }    
            }

            const fileName = Date.now() + filename.replace(/\s/g, '')
            const out = fs.createWriteStream(path.join(process.cwd(), 'uploads', fileName))
            createReadStream().pipe(out)
            await finished(out)
            
            console.log(fileName)
            const transport = await model.addTransport(token_obj.userId,branchId,transportName,fileName,transportColor)
            return {
                status: 200,
                message: 'Transport added successfully',
            }

        },
        updateTransport: async (_,{transportName,transportImg,branchId,transportColor},{token_obj,isAuth}) => {
            if(!isAuth){
                return new ValidationError("Token is invalid")
            }
            const [perm] = await model.checkPerm(token_obj.userId,branchId,4)
            if(!perm){
                return new ForbiddenError("You have not accses to addTransport")
            }
            const {createReadStream, filename, mimetype} = await transportImg

            if(filename){
                if (!['image/png', 'image/jpg', 'image/jpeg'].includes(mimetype)) {
                    return {
                        status: 400,
                        message: 'Invalid mime type for transport image!'
                    }    
                }
    
                const fileName = Date.now() + filename.replace(/\s/g, '')
                const out = fs.createWriteStream(path.join(process.cwd(), 'uploads', fileName))
                createReadStream().pipe(out)
                await finished(out)
            }

            const transport = await model.updateTransport(token_obj.userId,branchId,transportName,fileName,transportColor)
            if(transport.length === 0){
                return new ValidationError('No transports found or you do not have permission to view them')
            }
            return {
                status: 200,
                message: 'Transport updated successfully',
            }
        },
        deleteTransport: async (_,{transportId},{token_obj,isAuth}) => {
            if(!isAuth){
                return new ValidationError("Token is invalid")
            }
            const transport = await model.deleteTransport(token_obj.userId,transportId)
            if(transport.length === 0){
                return new ValidationError('No transports found or you do not have permission to view them')
            }
            return {
                status: 200,
                message: 'Transport deleted successfully',
            }
        }
    }
}