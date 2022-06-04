create database `chat_app`;

create table `chat_app`.`users` (
    `display_name` varchar(32) not null,
    `password` text not null,
    `is_admin` tinyint not null default 0,

    primary key (`display_name`)
);

create table `chat_app`.`user_tokens` (
    `token` varchar(512) not null,
    `user` varchar(32) not null,

    primary key (`token`),
    foreign key (`user`) references `chat_app`.`users` (`display_name`)
);

create table `chat_app`.`messages` (
    `id_data` binary(16) not null default (uuid_to_bin(uuid())),
    `author` varchar(32) not null,
    `content` text not null,
    `timestamp_data` datetime not null default (utc_timestamp()),

    `id` char(36) generated always as (bin_to_uuid(`id_data`)),
    `timestamp` text generated always as (date_format(`timestamp_data`, "%Y-%m-%dT%TZ")),

    primary key (`id_data`),
    foreign key (`author`) references `chat_app`.`users`(`display_name`)
);
