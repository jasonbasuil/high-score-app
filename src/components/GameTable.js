import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper"
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { TableSortLabel } from "@material-ui/core";

const useStyles = makeStyles({
  cellHeader: {
    backgroundColor: "#d2dcdf",
    fontColor: "#606767",
    fontWeight: "bold"
  }, 
  paper: {
    margin: "0 5% 5% 5%",
    width: "90%",
  },
});

const getAverageScore = (player) => (player.totalPoints / player.clicks).toFixed(2)

const GameTable = ({ players }) => {
  const classes = useStyles();

  const [isSortedByTotal, setIsSortedByTotal] = useState(true)
  const [isSortedByAverage, setIsSortedByAverage] = useState(false)
  const [sortedPlayers, setSortedPlayers] = useState(null)

  const toggleSortByTotal = () => {
    setIsSortedByTotal(prev => !prev)
    setIsSortedByAverage(prev => !prev)
  }

  const toggleSortByAverage = () => {
    setIsSortedByTotal(prev => !prev)
    setIsSortedByAverage(prev => !prev)
  }

  useEffect(() => {
    const sortPlayers = () => {
      if (isSortedByTotal) {
        return players.sort((a, b) => (a.totalPoints < b.totalPoints) ? 1 : -1).slice(0,10)
      } else if (isSortedByAverage) {
        return players.sort((a, b) => (getAverageScore(a) < getAverageScore(b)) ? 1 : -1).slice(0,10)
      }
    }
    players && setSortedPlayers(sortPlayers)
  },[isSortedByAverage, isSortedByTotal, players])

  return (
    <TableContainer component={Paper} className={classes.paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="left" className={classes.cellHeader}size="medium">Ranking</TableCell>
            <TableCell align="left" className={classes.cellHeader}size="medium">Name</TableCell>
            <TableCell align="right" className={classes.cellHeader}size="medium"><TableSortLabel active={isSortedByTotal} onClick={toggleSortByTotal} direction="asc">Score</TableSortLabel></TableCell>
            <TableCell align="right" className={classes.cellHeader}size="medium">Clicks</TableCell>
            <TableCell align="right" className={classes.cellHeader}size="medium"><TableSortLabel active={isSortedByAverage} onClick={toggleSortByAverage} direction="asc">Average</TableSortLabel></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedPlayers && sortedPlayers.map((player, index) => (
            <TableRow key={player.name}>
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell align="left">{player.name}</TableCell>
              <TableCell align="right">
                {player.totalPoints}
              </TableCell>
              <TableCell align="right">{player.clicks}</TableCell>
              <TableCell align="right">{getAverageScore(player)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GameTable;
