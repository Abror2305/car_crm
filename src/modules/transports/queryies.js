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
        transport_name,
        transport_img,
        branch_id,
        transport_color,
        added_from
    )
values(
    $1::varchar,
    $2::varchar,
    $3::int,
    $4::varchar,
    $5::int
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
        when length($5::int)>0 then $5::int
        else branch_id
    end
    )
where
    transport_id=$1::int
returning *
`

const deleteTransport = `
update
    transports
set
    deleted_at = current_timestamp
where
    transport_id=$1::int
returning *
`

export default {
    checkHavePerm,
    addTransport,
    updateTransport,
    deleteTransport
}