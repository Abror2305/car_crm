const checkHavePerm = `
select 
    user_id 
from 
    user_permissions
where 
    user_id=$1::int and 
    branch_id=$2::int and 
    permission_id=$3::int and 
    permission_module_id=1  and
    deleted_at is null
`

const addTransport = `
insert into
    transports(
        added_from,
        branch_id,
        transport_name,
        transport_img,
        transport_color
    )
values(
    $1::int,
    $2::int,
    $3::varchar,
    $4::varchar,
    $5::varchar
)
returning *
`

const updateTransport = `
update
    transports
set
    transport_name = (case 
        when length($2::varchar)>0 then $2::varchar
        else transport_name
    end
    ),
    transport_img = (case
        when length($3::varchar)>0 then $3::varchar
        else transport_img
    end
    ),
    transport_color = (case
        when length($4::varchar)>0 then $4::varchar
        else transport_color
    end
    ),
    branch_id = (case
        when length($5::varchar) is not null then $5::int
        else branch_id
    end
    )
where
    transport_id=$1::int and 
    deleted_at is null and
    branch_id in (select branch_id from user_permissions where user_id=$6::int and permission_id=4 and permission_module_id=1 and deleted_at is null)
returning *
`

const deleteTransport = `
update
    transports
set
    deleted_at = current_timestamp
where
    transport_id=$1::int
    and deleted_at is null and
    branch_id in (select branch_id from user_permissions where user_id=$2::int and permission_id=3 and permission_module_id=1 and deleted_at is null)
returning *
`

const getTransports = `
select
  transport_id,
  transport_name,
  transport_img,
  transport_color,
  branch_id,
  added_from,
  created_at
from
  transports
where
  branch_id in (
    select
      branch_id
    from
      user_permissions
    where
      user_id = $1::int
      and permission_id = 2
      and permission_module_id = 1
      and deleted_at is null
  )and 
  ((transport_name ilike '%'|| $3::varchar || '%') or 
    (transport_color ilike '%'|| $3::varchar || '%'))
  and (
    case
      when length($2::varchar)>0 then branch_id=$2::int
      else true
    end
    )
    and deleted_at is null
order by
(
    case
    when $4::varchar = 'name'
    and $5::varchar = 'toLargest' then transport_name
    end
) asc,
(
    case
    when $4::varchar = 'name'
    and $5::varchar = 'toSmallest' then transport_name
    end
) desc,
(
    case
    when $4::varchar = 'register_in'
    and $5::varchar = 'toLargest' then created_at
    end
) asc,
(
    case
    when $4::varchar = 'register_in'
    and $5::varchar = 'toSmallest' then created_at
    end
) desc
`

export default {
    checkHavePerm,
    addTransport,
    updateTransport,
    deleteTransport,
    getTransports
}