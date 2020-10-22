import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const useStyles = makeStyles({
  table: {
    marginLeft: "5%",
    marginRight: "5%",
    width: "80%",
  },
});

const getAverageScore = (player) => player.totalPoints / player.clicks

const GameTable = ({ players }) => {
  const classes = useStyles();

  return (
    <TableContainer>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Ranking</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Score</TableCell>
            <TableCell align="right">Clicks</TableCell>
            <TableCell align="right">Average</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {players && players.map((player, index) => (
            <TableRow key={player.name}>
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell align="right">{player.name}</TableCell>
              <TableCell align="right">{player.totalPoints}</TableCell>
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
