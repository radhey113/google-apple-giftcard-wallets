import dotenv from "dotenv";
import server from "./bin/web";
dotenv.config({ path: "./.env" });

server();
