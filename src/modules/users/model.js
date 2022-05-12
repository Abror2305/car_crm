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
export default {
    login,
    register,
    branchAuth
}