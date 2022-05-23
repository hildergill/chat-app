create database `chat_app`;

create table `chat_app`.`users` (
    `id` char(36) not null,
    `display_name` varchar(256) not null,
    `password` text not null,

    primary key (`id`),
    unique key (`display_name`)
);

-- TODO Add something here later
