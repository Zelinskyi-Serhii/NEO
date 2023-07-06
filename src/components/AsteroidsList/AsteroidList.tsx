import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FC } from 'react';
import { AsteroidStatistic } from '../../types/AsteroidStatistic';
import './AsteroidList.scss';
import classNames from 'classnames';

interface Props {
  asteroids: AsteroidStatistic[],
  sortedAsteroids: AsteroidStatistic[],
}

export const AsteroidList: FC<Props> = ({ asteroids, sortedAsteroids }) => (
  <TableContainer component={Paper}>
  <Table sx={{ minWidth: 650 }} aria-label="simple table">
    <TableHead>
      <TableRow>
        <TableCell>Date</TableCell>
        <TableCell align="right">Total Diameters</TableCell>
        <TableCell align="right">Potentially Dangerous</TableCell>
        <TableCell align="right">Closest Asteroid</TableCell>
        <TableCell align="right">Fastest Asteroid</TableCell>
        <TableCell align="right">Total Asteroids per Day</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {asteroids.map((asteroid) => {
        const {
          id,
          date,
          diameterSum,
          potentiallyDangerousSum,
          closestNEO,
          fastestNEO,
          totalAsteroids,
        } = asteroid;
        const isTheMostDangerous = [...sortedAsteroids]
          .some(asteroid => asteroid.id === id) && potentiallyDangerousSum > 0;

        return (
          <TableRow
            key={diameterSum}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            className={classNames({'dangerous': isTheMostDangerous})}
          >
            <TableCell component="th" scope="row">
              {date}
            </TableCell>
            <TableCell align="right">{`${diameterSum}km`}</TableCell>
            <TableCell align="right">{potentiallyDangerousSum}</TableCell>
            <TableCell align="right">{`${closestNEO}km`}</TableCell>
            <TableCell align="right">{`${fastestNEO}km`}</TableCell>
            <TableCell align="right">{totalAsteroids}</TableCell>
          </TableRow>
        )}
      )}
    </TableBody>
  </Table>
</TableContainer>
);
