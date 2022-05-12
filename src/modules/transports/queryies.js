const checkHavePerm = `
select 
    user_id 
from 
    user_permissions
where 
    user_id=$1::int and 
    branch_id=$2::int and 
    permission_id=$3::int and 
    permission_module_id=3 and
    deleted_at is null
`



export default {
    checkHavePerm,
    addPerm,
    selectBranch,
    delPerm
}