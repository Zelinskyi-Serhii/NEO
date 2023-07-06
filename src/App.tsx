import { useCallback, useEffect, useState } from 'react'
import './App.scss'
import { getAsteroids } from './api/getAsteroids'
import { ErrorMessage } from './types/ErrorMessages'

export const App = () => {
  const [errorMessage, setErrorMessage] = useState<ErrorMessage | null>(null)

  const loadAsteroids = useCallback(async() => {
    try {
      await getAsteroids('2023-07-05');
    } catch (error) {
      setErrorMessage(error as ErrorMessage)
      console.log(error);
    }
  }, [])

  useEffect(() => {
    loadAsteroids()
  }, [loadAsteroids]);

  return (
    <h1>App Page</h1>
  )
}
