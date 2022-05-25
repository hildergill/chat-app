import { config } from "dotenv";
import MessagesRoute from "./routes/messagesroute";
import UsersRoute from "./routes/usersroute";
import ServersSingleton from "./singletons/servers";

config();

ServersSingleton.addMiddleware("/api/users/", UsersRoute);
ServersSingleton.addMiddleware("/api/messages/", MessagesRoute);
ServersSingleton.startServer();
