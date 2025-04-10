export default function MatchHistory({ history }) {
  if (!history.length) return null;

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
          </li>
        ))}
      </ul>
    </div>
  );
}
