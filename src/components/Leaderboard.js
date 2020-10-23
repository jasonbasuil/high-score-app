import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GameTable from "./GameTable";

const useStyles = makeStyles({
  header: {
    color: "#177ec8",
    marginTop: "3%"
  },
});

const Leaderboard = ({players }) => {
  const classes = useStyles()
  
  return (
    <div>
      <h2 className={classes.header}>Leaderboard</h2>
      <GameTable players={players}/>
    </div>
  );
};

export default Leaderboard;
