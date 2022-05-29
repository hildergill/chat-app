// This file is a part of chat-app (https://www.github.com/hildergill/chat-app)
// Copyright 2022 Hilder Gill

type Message = {
	id: string;
	author: string;
	displayName: string | null;
	content: string;
	timestamp: number;
};

export default Message;
