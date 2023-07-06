import { formatAsteroids } from "../helperFunctions/formatData";
import { setSearchParams } from "../helperFunctions/setSearchParams";
import { AsteroidsInfo } from "../types/AsteroidInfo";
import { ErrorMessages } from "../types/ErrorMessages"
import { requestMethods } from "./fetchData"

export const getAsteroids = async (date: string) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;

  const url = new URL(BASE_URL);
  const searchParams = {
    start_date: date,
    end_date: date,
    api_key: API_KEY,
  }

  url.search = setSearchParams(url.searchParams, searchParams);

  try {
    const asteroids = await requestMethods.get<AsteroidsInfo>(url);
    const formattedAsteroids = formatAsteroids(asteroids, date);

    return formattedAsteroids;
  } catch (error) {
    throw new Error(error as ErrorMessages)
  }
}
