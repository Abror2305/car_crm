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

const addPerm = `
insert into 
    user_permissions(user_id, branch_id, permission_id, permission_module_id, added_from)
values($1::int,$2::int,$3::int,$4::int,$5::int)
returning *
`

const selectBranch = `
    select branch_id from user_permissions where up_id = $1::int and deleted_at is null
`

const delPerm = `
update user_permissions set deleted_at=current_timestamp
where 
    up_id=$1::int and
    deleted_at is null
returning user_id,deleted_at;
`


export default {
    checkHavePerm,
    addPerm,
    selectBranch,
    delPerm
}