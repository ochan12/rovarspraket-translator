import { FastifyPluginCallback } from "fastify";
import { TranslationLanguage } from "../config";
import {
  translateToNormalText,
  translateToRovarspraket,
} from "../services/translation";

const translationRoutes: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.post<{
    Body: {
      text: string;
    };
    Params: {
      language: TranslationLanguage;
    };
  }>(
    "/:language",
    {
      schema: {
        body: {
          type: "object",
          properties: {
            text: {
              type: "string",
            },
          },
        },
      },
    },
    (req) => {
      switch (req.params.language) {
        case "rovarsprak":
          return translateToRovarspraket(req.body.text);
        default:
          return translateToNormalText(req.body.text);
      }
    }
  );
  done();
};
export default translationRoutes;
