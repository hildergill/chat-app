create database `chat_app`;

create table `chat_app`.`users` (
    `display_name` varchar(32) not null,
    `password` text not null,
    `is_admin` tinyint(1) not null default 0,

    primary key (`display_name`)
);

create table `chat_app`.`user_tokens` (
    `token` varchar(512) not null,
    `user` varchar(32) not null,

    primary key (`token`),
    foreign key (`user`) references `chat_app`.`users` (`display_name`)
);

create table `chat_app`.`messages` (
    `id_bin` binary(16) not null default (uuid_to_bin(uuid())),
    `id` char(36) generated always as (bin_to_uuid(`id_bin`)),
    `author` varchar(32) not null,
    `content` text not null,
    `timestamp` datetime not null default (utc_timestamp()),

    primary key (`id_bin`),
    foreign key (`author`) references `chat_app`.`users`(`display_name`)
);
