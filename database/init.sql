-- This file is a part of chat-app (https://www.github.com/hildergill/chat-app)
-- Copyright 2022 Hilder Gill

create database `chat_app`;

create table `chat_app`.`users` (
    `id` binary(16) not null default (uuid_to_bin(uuid())),
    `display_name` varchar(256) not null,
    `password` text not null,

    primary key (`id`),
    unique key (`display_name`)
);

create table `chat_app`.`user_tokens` (
    `token` varchar(512) not null,
    `user` binary(16) not null,

    primary key (`token`),
    foreign key (`user`) references `chat_app`.`users` (`id`)
);

create table `chat_app`.`messages` (
    `id` binary(16) not null default (uuid_to_bin(uuid())),
    `author` binary(16) not null,
    `content` text not null,
    `timestamp` datetime not null default (utc_timestamp()),

    primary key (`id`),
    foreign key (`author`) references `chat_app`.`users` (`id`)
);

-- TODO Add something here later
