insert into users( user_name, password, gender) values 
('admin','admin',1),
('Abror','Abror1234',1),
('Maxliyo','Maxliyo123',2),
('Maftuna','Maftuna123',2),
('Asad','Asad1234',1);

insert into branches(
    branch_name,
    branch_address,
    added_from
) values
('Chirchiq','Tashkent, Chirchiq',1),
('Toshkent','Tashkent, Chilonzor',1),
('Andijon','Andijon, Asaka',1),
('Buxoro','Buxoro, Buxoro',1),
('Xorazm','Xorazm, Xiva',1);

insert into transports(
    transport_name,
    transport_img,
    transport_color,
    branch_id,
    added_from
) values 
('Bugatti Chiron','./bugatti_chiron.jpeg','White',1,1),
('Matiz','./matiz.jpeg','White',2,1),
('Jentra','./jentra.jeg','White',3,1),
('Tesla Model X','./teslax.jpeg','White',4,1),
('Damas','./damas.jpeg','White',5,1);

insert into permissions(permission_name) values 
('Create'),
('Read'),
('Delete'),
('Update');

insert into permissions_module(permission_module_name) values 
('Transports'),
('Branches'),
('Permissions');

insert into user_permissions(
    user_id,
    branch_id,
    permission_id,
    permission_module_id,
    added_from
) values
(1,1,1,1,1),
(1,1,2,1,1),
(1,1,3,1,1),
(1,1,4,1,1),
(1,1,1,2,1),
(1,1,2,2,1),
(1,1,3,2,1),
(1,1,4,2,1),
(1,1,1,3,1),
-- (1,1,2,3,1),
(1,1,3,3,1),
(1,1,4,3,1),
(2,1,2,1,1),
(3,1,2,1,1),
(4,1,2,1,1),
(5,1,2,1,1);