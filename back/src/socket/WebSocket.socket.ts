import { JwtPayload } from "jsonwebtoken";
import { Socket } from "socket.io";

interface WebSocket extends Socket{
    payload: JwtPayload
}