import { AsteroidsInfo } from "../types/AsteroidInfo";

export const formatAsteroids = (asteroids: AsteroidsInfo, date: string) => {
  const { near_earth_objects } = asteroids;
  const data = near_earth_objects[date];
  let diameterSum = 0;
  let potentiallyDangerousSum = 0;
  let closestNEO = Infinity;
  let fastestNEO = 0;

  for (const asteroid of data) {
    const {
      estimated_diameter,
      is_potentially_hazardous_asteroid,
      close_approach_data,
    } = asteroid;

    diameterSum += estimated_diameter.kilometers.estimated_diameter_max;
    
    if (is_potentially_hazardous_asteroid) {
      potentiallyDangerousSum++;
    }

    if (closestNEO > Number(close_approach_data[0].miss_distance.kilometers)) {
      closestNEO = Number(close_approach_data[0].miss_distance.kilometers);
    }

    if (fastestNEO < Number(close_approach_data[0].relative_velocity.kilometers_per_hour)) {
      fastestNEO = Number(close_approach_data[0].relative_velocity.kilometers_per_hour);
    }
  }

  const statisticPerDay = {
    id: Math.random(),
    date,
    diameterSum,
    potentiallyDangerousSum,
    closestNEO,
    fastestNEO,
    totalAsteroids: data.length
  }

  return statisticPerDay;
};
