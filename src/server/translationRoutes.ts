import { FastifyPluginCallback } from "fastify";
import {
  translateToNormalText,
  translateToRovarspraket,
} from "../services/translation";

const translationRoutes: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.post<{
    Body: {
      text: string;
    };
  }>(
    "/normal",
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
      return translateToNormalText(req.body.text);
    }
  );
  fastify.post<{
    Body: {
      text: string;
    };
  }>(
    "/rovarsprak",
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
      return translateToRovarspraket(req.body.text);
    }
  );
  done();
};
export default translationRoutes;
