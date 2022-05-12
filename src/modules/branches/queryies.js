const checkHavePerm = `
select 
    user_id 
from 
    user_permissions
where 
    user_id=$1::int and  
    permission_id=$2::int and 
    permission_module_id=2 and
    deleted_at is null
`

const addBranch = `
insert into
    branches(
        branch_name,
        branch_address,
        added_from
    )
values(
    $1::varchar,
    $2::varchar,
    $3::int
)
returning * 
`

const updateBranch = `
update
    branches
set 
branch_name = (
    case
        when length($2) > 0 then $2
        else branch_name
    end
    ),
branch_address = (
    case
        when length($3) > 0 then $3
        else branch_address
    end
)
where deleted_at is null and branch_id=$1
returning *
`

const deleteBranch = `
update
    branches
set
    deleted_at = current_timestamp
where deleted_at is null and branch_id=$1::int
returning *
`

export default {
    checkHavePerm,
    addBranch,
    updateBranch,
    deleteBranch
}