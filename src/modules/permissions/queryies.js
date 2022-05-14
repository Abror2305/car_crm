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

const check_exists = `
select 
    user_id
from
    user_permissions
where
    user_id=$1::int and
    branch_id=$2::int and
    permission_id=$3::int and
    permission_module_id=$4::int and
    deleted_at is null
`

const delPerm = `
update user_permissions set deleted_at=current_timestamp
where 
    up_id=$1::int and
    deleted_at is null
returning user_id,deleted_at;
`
const myPermissions = `
select
  up.up_id,
  u.user_id,
  u.user_name,
  up.branch_id,
  b.branch_name,
  p.permission_name,
  pm.permission_module_name,
  up.added_from,
  ua.user_name as added_from_user,
  up.created_at
from
  user_permissions as up
  join users as u on u.user_id = up.user_id
  join permissions as p on p.permission_id = up.permission_id
  join permissions_module as pm on pm.permission_module_id = up.permission_module_id
  join users as ua on ua.user_id = up.added_from
  join branches as b on b.branch_id=up.branch_id
where
  up.user_id = $1::int
  and up.deleted_at is null
`

const allPermissions = `
select
  up.up_id,
  u.user_id,
  u.user_name,
  up.branch_id,
  b.branch_name,
  p.permission_name,
  pm.permission_module_name,
  up.added_from,
  ua.user_name as added_from_user,
  up.created_at
from
  user_permissions as up
  join users as u on u.user_id = up.user_id
  join permissions as p on p.permission_id = up.permission_id
  join permissions_module as pm on pm.permission_module_id = up.permission_module_id
  join users as ua on ua.user_id = up.added_from
  join branches as b on b.branch_id = up.branch_id
where
  up.deleted_at is null
  and up.branch_id in (
    select
      branch_id
    from
      user_permissions
    where
      user_id = $1::int
      and permission_id = 2
      and permission_module_id = 3
      and deleted_at is null
  )
  and (
    case
      when length($3::varchar)>0 then up.branch_id = $3::int
      else true
    end
  )and (
    case
      when length($2::varchar)>0 then up.user_id = $2::int
      else true
    end
  ) and
       (
        (b.branch_name ilike '%' || $4::varchar || '%')
        and (u.user_name ilike '%' || $5::varchar || '%')
      )
order by
    (
        case
        when $6::varchar = 'userName'
        and $7::varchar = 'toLargest' then u.user_name
        end
    ) asc,
    (
        case
        when $6::varchar = 'userName'
        and $7::varchar = 'toSmallest' then u.user_name
        end
    )desc,
    (
        case
        when $6::varchar = 'branchName'
        and $7::varchar = 'toLargest' then b.branch_name
        end
    ) asc,
    (
        case
        when $6::varchar = 'branchName'
        and $7::varchar = 'toSmallest' then b.branch_name
        end
    )desc,
    (
        case
        when $6::varchar = 'createdAt'
        and $7::varchar = 'toLargest' then up.created_at
        end
    )asc,
    (
        case
        when $6::varchar = 'createdAt'
        and $7::varchar = 'toSmallest' then up.created_at
        end
    )desc
`

export default {
    checkHavePerm,
    addPerm,
    selectBranch,
    delPerm,
    myPermissions,
    allPermissions,
    check_exists
}