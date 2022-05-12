const login = `
select 
    user_id
from
    users
where
    lower(user_name)=lower($1::varchar) and
    password=crypt($2::varchar,password);
`

const register = `
insert into users(user_name,password,birth_date,gender)
values($1::varchar,
    crypt($2,gen_salt('bf')),
    case
        when length($3::varchar)>0 then $3::date
        else null
    end,
    $4::smallint)
returning user_id
`

const user = `
select 
    user_id,
    user_name,
    birth_date,
    gender,
    created_at
from
    users
where user_id=$1::int and
deleted_at is null
`

const users = `
select 
    user_id,
    user_name,
    birth_date,
    gender,
    created_at
from
    users
where (case
	when $1::bool is not null then user_id=$1::int
    else (deleted_at is null ) and (user_name ilike '%'|| $2::varchar || '%')
    end)
order by
    (
        case
        when $4::varchar = 'username'
        and $3::varchar = 'toLargest' then user_name
        end
    ) asc,
    (
        case
        when $4::varchar = 'username'
        and $3::varchar = 'toSmallest' then user_name
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
        and $3::varchar = 'toSmallest' then user_name
        end
    )desc
`

const branchAuth = `
select
    branch_id
from
    branches
where branch_id = $1::int
`
const checkHavePerm = `
select 
    user_id 
from 
    user_permissions
where 
    user_id=$1::int and 
    permission_id=2 and 
    permission_module_id=3 and
    deleted_at is null
`
export default {
    login,
    register,
    branchAuth,
    user,
    users,
    checkHavePerm
}