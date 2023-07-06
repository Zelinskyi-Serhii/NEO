import { AsteroidsInfo } from "../types/AsteroidInfo";

export const formatAsteroids = (asteroids: AsteroidsInfo, date: string) => {
  const { near_earth_objects } = asteroids;
  const data = near_earth_objects[date];

  const formattedAsteroids = data.map(asteroid => {
    const {
      estimated_diameter,
      is_potentially_hazardous_asteroid,
      name,
      close_approach_data,
    } = asteroid;

    return {
      name,
      diameter: estimated_diameter.kilometers.estimated_diameter_max,
      potentiallyDangerous: is_potentially_hazardous_asteroid,
      distanceToEarth: close_approach_data[0].miss_distance.kilometers,
      speed: close_approach_data[0].relative_velocity.kilometers_per_hour,
    }
  });

  return formattedAsteroids;
};
