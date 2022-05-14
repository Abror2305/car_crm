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
        when length($2::varchar) > 0 then $2::varchar
        else branch_name
    end
    ),
branch_address = (
    case
        when length($3::varchar) > 0 then $3::varchar
        else branch_address
    end
)
where deleted_at is null and branch_id=$1
returning *
`

const branches = `
select 
    branch_id,
    branch_name,
    branch_address,
    added_from,
    created_at
from
    branches
where (case
	when length($1::varchar)>0 is not null then branch_id=$1::int
    else (deleted_at is null ) and ((branch_name ilike '%'|| $2::varchar || '%') or 
    (branch_address ilike '%'|| $2::varchar || '%'))
    end)
order by
    (
        case
        when $4::varchar = 'name'
        and $3::varchar = 'toLargest' then branch_name
        end
    ) asc,
    (
        case
        when $4::varchar = 'name'
        and $3::varchar = 'toSmallest' then branch_name
        end
    )desc,
    (
        case
        when $4::varchar = 'register_in'
        and $3::varchar = 'toLargest' then created_at
        end
    )asc,
    (
        case
        when $4::varchar = 'register_in'
        and $3::varchar = 'toSmallest' then created_at
        end
    )desc
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
    deleteBranch,
    branches
}