export default function MatchHistory({ history }) {
  if (!history.length) return null;

  // Agrupa todos os gols em um único objeto somando por jogador
  const allGoals = history.reduce((acc, match) => {
    if (match.goals) {
      for (const [player, goals] of Object.entries(match.goals)) {
        acc[player] = (acc[player] || 0) + goals;
      }
    }
    return acc;
  }, {});

  // Ordena do maior pro menor
  const sortedScorers = Object.entries(allGoals).sort((a, b) => b[1] - a[1]);

  return (
    <div className='match-history'>
      <h2 className='history-title'>Histórico de Partidas</h2>
      <ul>
        {history.map((h, i) => (
          <li key={i} className='history-item'>
            <p>
              <strong>{h?.teams?.[0].name}</strong> {h?.scores?.[0]} x{' '}
              {h?.scores?.[1]} <strong>{h?.teams?.[1].name}</strong>
            </p>
            <p className='history-time'>
              Tempo: {Math.floor(h.timeElapsed / 60)}:
              {(h.timeElapsed % 60).toString().padStart(2, '0')}
            </p>
            {h.goals && (
              <ul className='goals-list'>
                {Object.entries(h.goals).map(([player, goals]) => (
                  <li key={player}>
                    {player} — {goals} gol{goals > 1 ? 's' : ''}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      {sortedScorers.length > 0 && (
        <>
          <h3 className='history-title'>Artilharia</h3>
          <ul className='scorer-summary'>
            {sortedScorers.map(([player, goals]) => (
              <li key={player}>
                {player} — {goals} gol{goals > 1 ? 's' : ''}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
