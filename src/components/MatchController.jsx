import { useEffect, useMemo, useState } from 'react';

export default function MatchController({
  teams,
  addToHistory,
  selectedTeams,
  resetLocalStorage,
}) {
  const [currentTeams, setCurrentTeams] = useState(selectedTeams);
  const waitingTeam = useMemo(() => {
    const allTeams = [0, 1, 2];
    return allTeams.find((idx) => !currentTeams.includes(idx));
  }, [currentTeams]);
  const [scores, setScores] = useState([0, 0]);
  const [time, setTime] = useState(420); // 7 min = 420s

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scores.some((score) => score >= 2) || time <= 0) {
      addToHistory((prev) => [
        ...prev,
        {
          teams: [teams[currentTeams[0]], teams[currentTeams[1]]],
          scores,
          timeElapsed: 420 - time,
        },
      ]);

      let winnerIndex = null;

      if (scores[0] >= 2) {
        winnerIndex = 0;
      } else if (scores[1] >= 2) {
        winnerIndex = 1;
      } else {
        winnerIndex = scores[0] > scores[1] ? 0 : 1;
      }

      const nextIn = waitingTeam;
      const nextTeams = [currentTeams[winnerIndex], nextIn];

      setCurrentTeams(nextTeams);
      setScores([0, 0]);
      setTime(420);
    }
  }, [scores, time]);

  const addGoal = (index) => {
    setScores((prev) => {
      const updated = [...prev];
      updated[index]++;
      return updated;
    });
  };

  return (
    <div className='scoreboard'>
      <h2 className='scoreboard-title'>Placar da Partida</h2>
      <div className='timer'>
        Tempo restante: {Math.floor(time / 60)}:
        {(time % 60).toString().padStart(2, '0')}
      </div>
      <div className='scoreboard-grid'>
        {currentTeams.map((teamIndex, i) => (
          <div key={teamIndex} className='team-card' onClick={() => addGoal(i)}>
            <h3 className='team-name'>{teams[teamIndex]?.name}</h3>
            {teams[teamIndex].players.map((player) => {
              return <li>{player}</li>;
            })}
            <p className='team-score'>{scores[i]}</p>
            <button className='goal-button'>+1</button>
          </div>
        ))}
      </div>
      <button
        onClick={resetLocalStorage}
        style={{ marginBottom: '1rem', width: '100%' }}
      >
        🔄 Resetar Semana
      </button>
    </div>
  );
}
