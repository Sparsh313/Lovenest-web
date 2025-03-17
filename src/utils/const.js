export const BASE_URL = "http://localhost:7777";

import io from "socket.io-client";

export const createSocketConnections = () => {
  return io(BASE_URL);
};
