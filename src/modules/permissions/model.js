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
async function myPermissions(userId){
    return await pg(query.myPermissions,userId)
}
async function allPermissions(userId, s_userId,branchId, userName,branchName,sort,sortOption){
    return await pg(query.allPermissions,userId,s_userId||0,branchId||0, branchName|| '', userName|| '',sort,sortOption)
}
async function check_exists(userId,branchId,permissionId,permissionModule){
    return await pg(query.check_exists,userId,branchId,permissionId,permissionModule)
}
export default {
    checkPerm,
    addPerm,
    selectBranch,
    delPerm,
    myPermissions,
    allPermissions,
    check_exists
}