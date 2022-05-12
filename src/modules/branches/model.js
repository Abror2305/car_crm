import pg from "#config/pg"
import query from './queryies.js'

async function checkHavePerm(user_id,permission_id){
    return await pg(query.checkHavePerm,user_id,permission_id)
}

async function addBranch(branchName,branchAddress,user_id){
    return await pg(query.addBranch,branchName,branchAddress,user_id)
}

async function updateBranch(branchId,branchName,branchAddress){
    return await pg(query.updateBranch,branchId,branchName,branchAddress)
}

async function deleteBranch(branchId) {
    return await pg(query.deleteBranch,branchId)
}
async function getBranches(branchId,search,sort,sortOption){
    return await pg(query.branches,branchId,search||'',sortOption,sort)
}


export default {
    checkHavePerm,
    addBranch,
    updateBranch,
    deleteBranch,
    getBranches
}