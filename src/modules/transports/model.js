import pg from "#config/pg"
import query from './queryies.js'

async function checkPerm(userId,branchId,permissionId){
    return await pg(query.checkHavePerm,userId,branchId,permissionId)
}
async function getTransports(userId,branchId,search,sortOption,sort){
    if(!branchId) branchId = null
    return await pg(query.getTransports,userId,branchId,search|| '',sortOption,sort)
}
async function addTransport(userId,branchId,transportName,transportImg,transportColor){
    return await pg(query.addTransport,userId,branchId,transportName,transportImg,transportColor)
}
async function updateTransport(transportId,branchId,transportName,fileName,transportColor,userId){
    return await pg(query.updateTransport,transportId,transportName,fileName,transportColor,branchId,userId)
}
async function deleteTransport(userId,transportId){
    return await pg(query.deleteTransport,transportId,userId,)
}

export default {
    checkPerm,
    getTransports,
    updateTransport,
    addTransport,
    deleteTransport
}