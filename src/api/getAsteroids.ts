import { formatAsteroids } from "../helperFunctions/formatData";
import { AsteroidsInfo } from "../types/AsteroidInfo";
import { ErrorMessage } from "../types/ErrorMessages"
import { requestMethods } from "./fetchData"

export const getAsteroids = async (date: string) => {
  // const BASE_URL = import.meta.env.BASE_URL;
  const BASE_URL = 'https://api.nasa.gov/neo/rest/v1/feed';
  const API_KEY = import.meta.env.API_KEY;
  const searchParams = `?start_date=${date}&end_date=${date}&api_key=PXjG2k4gTiQT1uLnemaLCDAX3RDa7jRbL69WIROx`;

  const url = new URL(BASE_URL);
  url.search = searchParams;

  try {
    const asteroids = await requestMethods.get<AsteroidsInfo>(url);

    const formatedAsteroids = formatAsteroids(asteroids, date);

    console.log(formatedAsteroids);
  } catch (error) {
    throw new Error(error as ErrorMessage)
  }
}
