import { useState } from 'react';

export default function MatchHistory({ history }) {
  if (!history.length) return null;
  const [copied, setCopied] = useState(false);

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
  const generateShareMessage = () => {
    let message = `🏆 Histórico de Partidas:\n\n`;

    history.forEach((h) => {
      const teamA = h.teams?.[0]?.name;
      const teamB = h.teams?.[1]?.name;
      const scoreA = h.scores?.[0];
      const scoreB = h.scores?.[1];
      const time = `${Math.floor(h.timeElapsed / 60)}:${(h.timeElapsed % 60)
        .toString()
        .padStart(2, '0')}`;
      message += `${teamA} ${scoreA} x ${scoreB} ${teamB} (⏱️ ${time})\n`;

      if (h.goals) {
        Object.entries(h.goals).forEach(([player, goals]) => {
          message += `   ⚽ ${player} — ${goals} gol${goals > 1 ? 's' : ''}\n`;
        });
      }
      message += '\n';
    });

    if (sortedScorers.length) {
      message += `🔥 Artilharia do Dia:\n`;
      sortedScorers.forEach(([player, goals]) => {
        message += `   • ${player} — ${goals} gol${goals > 1 ? 's' : ''}\n`;
      });
    }

    return message.trim();
  };
  const copyToClipboard = () => {
    const msg = generateShareMessage();
    navigator.clipboard.writeText(msg).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const shareViaWhatsApp = () => {
    const msg = generateShareMessage();
    const url = `https://wa.me/?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };
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
      <div className='share-buttons' style={{ marginTop: '1rem' }}>
        <button onClick={copyToClipboard}>
          {copied ? '✅ Copiado!' : '📋 Copiar resumo'}
        </button>
      </div>
    </div>
  );
}
