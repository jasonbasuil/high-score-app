import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Tooltip } from "@material-ui/core"

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
            <TableCell align="right" className={classes.cellHeader}size="medium">
              <Tooltip title="Sort by highest score">
                <TableSortLabel 
                  active={isSortedByTotal} 
                  onClick={toggleSortByTotal} 
                  direction="asc" 
                  style={isSortedByTotal ? {color: "#177ec8"} : null}>
                    Score
                </TableSortLabel>
              </Tooltip>
            </TableCell>
            <TableCell align="right" className={classes.cellHeader}size="medium">Clicks</TableCell>
            <TableCell align="right" className={classes.cellHeader}size="medium">
              <Tooltip title="Sort by average score">
                <TableSortLabel 
                  active={isSortedByAverage} 
                  onClick={toggleSortByAverage} 
                  direction="asc" 
                  style={isSortedByAverage ? {color: "#177ec8"} : null}>
                    Average
                </TableSortLabel>
              </Tooltip>
            </TableCell>
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
