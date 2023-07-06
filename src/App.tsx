import { useCallback, useEffect, useState } from 'react'
import './App.scss'
import { getAsteroids } from './api/getAsteroids'
import { ErrorMessages } from './types/ErrorMessages'
import { AsteroidStatistic } from './types/AsteroidStatistic'
import { AsteroidList } from './components/AsteroidsList'

export const App = () => {
  const [errorMessage, setErrorMessage] = useState<ErrorMessages | null>(null);
  const [asteroids, setAsteroids] = useState<AsteroidStatistic[]>([]);

  const loadAsteroids = useCallback(async(newDate: string) => {
    try {
      const asteroidsFromServer = await getAsteroids(newDate);

      setAsteroids((prevState) => {
        if (prevState.length === 6) {
          return [ ...prevState.slice(1, 6), asteroidsFromServer];
        }

        return [ ...prevState, asteroidsFromServer]
      });
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(error as ErrorMessages);
    }
  }, []);

  useEffect(() => {
    function getCurrentDate() {
      const date = new Date();
      const currentDay = date.getDate();
      const currentMonth = date.getMonth() + 1;

      let day = currentDay + 1;

      const interval = setInterval(() => {
        day++;
        if (day > currentDay) {
          day = 1;
        }

        const formattedDate = `${date.getFullYear()}-${currentMonth.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        loadAsteroids(formattedDate)
      }, 5000);

      return () => {
        clearInterval(interval);
      };
    }

    getCurrentDate();
  }, [loadAsteroids]);

  const mappedAsteroids = asteroids.map(asteroid => ({...asteroid}));

  const sortedAsteroids = [...mappedAsteroids].sort((prev, curr) => (
    curr.potentiallyDangerousSum - prev.potentiallyDangerousSum
    || prev.closestNEO - curr.closestNEO
  ));

  const slicedFirstTwo = sortedAsteroids.slice(0, 2);

  return (
    <div className="app">
      {errorMessage && (
        <h2>{errorMessage}</h2>
      )}
      <AsteroidList 
        asteroids={asteroids}
        sortedAsteroids={slicedFirstTwo}
      />
    </div>
  )
}
