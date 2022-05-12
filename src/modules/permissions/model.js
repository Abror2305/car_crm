import pg from "#config/pg"
import query from './queryies.js'

async function checkPerm(userId,branchId,permissionId){
    return await pg(query.checkHavePerm,userId,branchId,permissionId)
}

async function selectBranch(up_id){
    return await pg(query.selectBranch,up_id)
}

async function addPerm(userId,branchId,permission,permissionModule,addedFrom){
    return await pg(query.addPerm,userId,branchId,permission,permissionModule,addedFrom)
}

async function delPerm(up_id){
    return await pg(query.delPerm,up_id)
}

export default {
    checkPerm,
    addPerm,
    selectBranch,
    delPerm
}