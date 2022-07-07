import fastify, { FastifyInstance } from "fastify";
import jokeRoutes from "./jokeRoutes";
import translationRoutes from "./translationRoutes";

const server: FastifyInstance = fastify({});
server.register(jokeRoutes, { prefix: "/jokes" });
server.register(translationRoutes, { prefix: "/translate" });

export default server;
