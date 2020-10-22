import React from "react";
import GameTable from "./GameTable";

const Leaderboard = ({players }) => {
  return (
    <div>
      <h1>Leadboard</h1>
      <GameTable players={players}/>
    </div>
  );
};

export default Leaderboard;
