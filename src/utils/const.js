export const BASE_URL = "http://localhost:7777";
  location.hostname === "localhost" ? "http://localhost:7777" : "/api";

  
import io from "socket.io-client";

export const createSocketConnections = () => {
  return io(BASE_URL);
};
