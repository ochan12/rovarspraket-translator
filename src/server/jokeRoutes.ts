import { FastifyPluginCallback } from "fastify";
import { jokeOfTheDay } from "../services/jokes";

const jokeRoutes: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.get("/of-the-day", async (req, res) => {
    const joke = await jokeOfTheDay();
    res.send(joke);
  });
  done();
};
export default jokeRoutes;
