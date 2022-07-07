import { FastifyPluginCallback } from "fastify";
import { TranslationLanguage } from "../config";
import { JokeConfig, jokeOfTheDay } from "../services/jokes";
import { translateToRovarspraket } from "../services/translation";

const jokeRoutes: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.get<{
    Params: { translation: TranslationLanguage };
    Querystring: JokeConfig & { categories: string };
  }>(
    "/:translation",
    {
      schema: {
        params: {
          translation: {
            type: "string",
            enum: ["rovarsprak", "normal"],
          },
        },
        querystring: {
          type: "object",
          properties: {
            categories: {
              type: "string",
              description:
                "Comma separated values of  Programming , Misc, Dark, Pun, Spooky, Christmas, Any",
            },
            lang: {
              type: "string",
              enum: ["cs", "de", "en", "es", "fr", "pt"],
            },
            type: {
              type: "string",
              enum: ["single", "twopart"],
            },
          },
        },
      },
    },
    async (req, res) => {
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
          res.send(joke.joke);
          break;
      }
    }
  );
  done();
};
export default jokeRoutes;
