-- This file is a part of chat-app (https://www.github.com/hildergill/chat-app)
-- Copyright 2022 Hilder Gill

create user `chat_app`@`localhost` identified with mysql_native_password by "12345678";
grant select, insert, update, delete on `chat_app`.* to `chat_app`@`localhost`;
