import pg from "#config/pg"
import query from './queryies.js'

async function checkPerm(userId,branchId,permissionId){
    return await pg(query.checkHavePerm,userId,branchId,permissionId)
}

export default {
    checkPerm,

}