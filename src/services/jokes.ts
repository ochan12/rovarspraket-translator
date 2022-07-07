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

type JokeResponseConfig = {
  error: boolean;
  category: string;
  type: string;
  joke: string;
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

export async function jokeOfTheDay(jokeConfig: Partial<JokeConfig>) {
  const finalJokeConfig = { ...defaultJokeConfiguration, ...jokeConfig };
  return jokeService.get<JokeResponseConfig>(buildJokeUrl(finalJokeConfig));
}
