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

const branchAuth = `
select
    branch_id
from
    branches
where branch_id = $1::int
`

export default {
    login,
    register,
    branchAuth
}