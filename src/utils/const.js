export const BASE_URL =
  location.hostname === "localhost"
    ? "http://localhost:7777"
    : "https://lovenest-production.up.railway.app";

import io from "socket.io-client";

export const createSocketConnections = () => {
  return io(BASE_URL);
};
