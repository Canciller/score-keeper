import React, { useState, useEffect } from "react";
import PlayerService from "services/PlayerService";

export default function () {
  const [busy, setBusy] = useState(true);
  const [player, setPlayer] = useState(null);
  const [players, setPlayers] = useState(null);

  return {
    busy,
    player,
    players,
  };
}
