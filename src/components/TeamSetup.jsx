import { useState } from 'react';

export default function TeamSetup({ onSubmit }) {
  const [teams, setTeams] = useState([
    { name: '', players: [''] },
    { name: '', players: [''] },
    { name: '', players: [''] },
  ]);

  const updateTeamName = (index, value) => {
    const updated = [...teams];
    updated[index].name = value;
    setTeams(updated);
  };

  const updatePlayer = (teamIndex, playerIndex, value) => {
    const updated = [...teams];
    updated[teamIndex].players[playerIndex] = value;
    setTeams(updated);
  };

  const addPlayer = (teamIndex) => {
    const updated = [...teams];
    updated[teamIndex].players.push('');
    setTeams(updated);
  };
  return (
    <div className='team-setup'>
      {teams.map((team, i) => (
        <div key={i} className='team-card'>
          <input
            placeholder={`Nome do Time ${i + 1}`}
            value={team.name}
            onChange={(e) => updateTeamName(i, e.target.value)}
            className='team-input'
          />
          {team.players.map((player, j) => (
            <input
              key={j}
              placeholder={`Jogador ${j + 1}`}
              value={player}
              onChange={(e) => updatePlayer(i, j, e.target.value)}
              className='player-input'
            />
          ))}
          <button onClick={() => addPlayer(i)} className='add-player-btn'>
            + Adicionar Jogador
          </button>
        </div>
      ))}
      <button
        className='confirm-teams-btn'
        onClick={() => onSubmit(teams)}
        disabled={teams.some((t) => !t.name)}
      >
        Confirmar Times
      </button>
    </div>
  );
}
