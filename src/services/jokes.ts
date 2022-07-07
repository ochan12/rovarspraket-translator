import axios from "axios";
import { JOKE_URL } from "../config";

const jokeService = axios.create({
  baseURL: JOKE_URL,
});

export type JokeConfig = {
  categories: (
    | "Programming"
    | "Misc"
    | "Dark"
    | "Pun"
    | "Spooky"
    | "Christmas"
    | "Any"
  )[];
  lang: "cs" | "de" | "en" | "es" | "fr" | "pt";
  type: "single" | "twopart";
};

type JokeResponseConfig = (
  | { joke: string; type: "single" }
  | { setup: string; delivery: string; type: "twopart" }
) & {
  error: boolean;
  category: string;

  flags: {
    nsfw: boolean;
    religious: boolean;
    political: boolean;
    racist: boolean;
    sexist: boolean;
    explicit: boolean;
  };
  id: number;
  safe: boolean;
  lang: string;
};

const defaultJokeConfiguration: JokeConfig = {
  categories: ["Programming"],
  lang: "en",
  type: "single",
};

const buildJokeUrl = (config: JokeConfig) => {
  const { categories, ...props } = config;
  const params = new URLSearchParams({ ...props });
  return `${categories.join(",")}?${params.toString()}`;
};

/**
 * Get a random joke from https://sv443.net/jokeapi/v2/
 * @param jokeConfig Parameters to build the joke
 * @returns A joke and some extra data
 */
export async function jokeOfTheDay(jokeConfig: Partial<JokeConfig>) {
  const finalJokeConfig = {
    ...defaultJokeConfiguration,
    ...Object.entries(jokeConfig).reduce<{}>((acc, [key, value]) => {
      if (!!value) acc = { ...acc, [key]: value };
      return acc;
    }, {}),
  };
  return jokeService
    .get<JokeResponseConfig>(buildJokeUrl(finalJokeConfig))
    .then((joke) => {
      if (joke.data.type === "single") return joke.data.joke;
      else {
        const { setup, delivery } = joke.data;
        return `- ${setup}\n- ${delivery}`;
      }
    });
}
