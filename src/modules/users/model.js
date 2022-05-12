import pg from "#config/pg"
import query from './queryies.js'

async function login(username,password){
    return await pg(query.login,username,password)
}
async function register(username,password,gender,birthDate){
    return await pg(query.register,username,password,birthDate,gender)
}
async function branchAuth(branch_id){
    return await pg(query.branchAuth,branch_id)
}
async function getUser(userId){
    return await pg(query.user,userId)
}
async function havePerm(userId){
    return await pg(query.checkHavePerm,userId)
}
async function getUsers(userId,search,sort,sortOption){
    return await pg(query.users,userId,search||'',sortOption,sort)
}

export default {
    login,
    register,
    branchAuth,
    getUser,
    havePerm,
    getUsers
}