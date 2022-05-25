create database `chat_app`;

create table `chat_app`.`users` (
    `id` char(36) not null,
    `display_name` varchar(256) not null,
    `password` text not null,

    primary key (`id`),
    unique key (`display_name`)
);

create table `chat_app`.`user_tokens` (
    `token` varchar(512) not null,
    `user` char(36) not null,

    primary key (`token`),
    foreign key (`user`) references `chat_app`.`users` (`id`)
);

create table `chat_app`.`messages` (
    `id` char(36) not null,
    `author` char(36) not null,
    `context` text not null,
    `timestamp` datetime not null,

    primary key (`id`),
    foreign key (`author`) references `chat_app`.`users` (`id`)
);

-- TODO Add something here later
