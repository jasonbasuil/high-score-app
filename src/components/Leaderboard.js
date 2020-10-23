import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GameTable from "./GameTable";

const useStyles = makeStyles({
  header: {
    color: "#177ec8"
  },
});

const Leaderboard = ({players }) => {
  const classes = useStyles()
  
  return (
    <div>
      <h1 className={classes.header}>Leaderboard</h1>
      <GameTable players={players}/>
    </div>
  );
};

export default Leaderboard;
