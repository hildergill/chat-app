type Message = {
	id: string;
	author: string;
	displayName: string | null;
	content: string;
	timestamp: number;
};

export default Message;
