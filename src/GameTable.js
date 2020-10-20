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

function createData(ranking, name, score, clicks, average) {
  return { ranking, name, score, clicks, average };
}

const rows = [
  createData(1, "Jason", 79, 8, 9.9),
  createData(2, "Bob", 55, 2, 27.5),
];

const GameTable = () => {
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
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.ranking}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.score}</TableCell>
              <TableCell align="right">{row.clicks}</TableCell>
              <TableCell align="right">{row.average}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GameTable;
