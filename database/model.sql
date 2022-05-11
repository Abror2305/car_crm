\c postgres

drop database if exists car_crm;
create database car_crm;

\c car_crm

drop table if exists users cascade;
create table users(
    user_id int generated always as identity primary key,
    user_name character varying(16) not null,
    password character varying(64),
    birth_date timestamp null,
    gender smallint not null,
    created_at timestamp default current_timestamp,
    deleted_at timestamp null
);

drop table if exists branches cascade;
create table branches(
    branch_id int generated always as identity primary key,
    branch_name character varying(32) not null unique,
    branch_address character varying(256) not null,
    added_from int not null references users(user_id),
    created_at timestamp default current_timestamp,
    deleted_at timestamp null
);

drop table if exists transports cascade;
create table transports(
    transport_id int generated always as identity primary key,
    transport_name character varying(32) not null,
    transport_img character varying(256) not null,
    transport_color character varying(16) not null,
    branch_id int not null references branches(branch_id),
    added_from int not null references users(user_id),
    created_at timestamp default current_timestamp,
    deleted_at timestamp null
);

drop table if exists permissions cascade;
create table permissions(
    permission_id int generated always as identity primary key,
    permission_name character varying(8) unique
);

drop table if exists permissions_module cascade;
create table permissions_module(
    permission_module_id int generated always as identity primary key,
    permission_module_name character varying(16) unique
);

drop table if exists user_permissions cascade;
create table user_permissions(
    up_id int generated always as identity primary key,
    user_id int not null references users(user_id),
    branch_id int not null references branches(branch_id),
    permission_id int not null references permissions(permission_id),
    permission_module_id int not null references permissions_module(permission_module_id),
    added_from int not null references users(user_id),
    created_at timestamp default current_timestamp,
    deleted_at timestamp null
);
