import axios from "axios";
import { JOKE_URL } from "../config";

const jokeService = axios.create({
  baseURL: JOKE_URL,
});

export async function jokeOfTheDay() {
  return jokeService.get("");
}
