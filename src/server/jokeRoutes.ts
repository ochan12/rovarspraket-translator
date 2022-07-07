import { FastifyPluginCallback } from "fastify";
import { TranslationLanguage } from "../config";
import { JokeConfig, jokeOfTheDay } from "../services/jokes";
import { translateToRovarspraket } from "../services/translation";

const jokeRoutes: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.get<{
    Params: { translation: TranslationLanguage };
    Querystring: JokeConfig & { categories: string };
  }>("/:translation", async (req, res) => {
    const joke = await jokeOfTheDay({
      ...req.query,
      categories:
        (req.query.categories?.split(",") as JokeConfig["categories"]) ??
        undefined,
    }).then((res) => res.data);
    switch (req.params.translation) {
      case "rovarsprak":
        res.send(translateToRovarspraket(joke.joke));
        break;
      default:
        res.send(joke);
        break;
    }
  });
  done();
};
export default jokeRoutes;
