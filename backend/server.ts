import { config } from "dotenv";
import UsersRoute from "./routes/usersroute";
import ServersSingleton from "./singletons/servers";

config();

ServersSingleton.addMiddleware("/api/users/", UsersRoute);
ServersSingleton.startServer();
