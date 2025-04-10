import { useState } from 'react';
import TeamSetup from './components/TeamSetup';
import MatchController from './components/MatchController';
import MatchHistory from './components/MatchHistory';

export default function App() {
  const defaultTeams = [
    {
      name: 'BUCETA ESFOLADA',
      players: ['Betim', 'Tineli', 'Rossi', 'Pato', 'Barbarini'],
    },
    {
      name: 'PINTO DE NEGÃO',
      players: ['Math', 'De', 'Neves', 'Olavo', 'Mizuno'],
    },
    {
      name: 'CU DO PIRECO',
      players: ['Pires', 'Vini', 'Jordão', 'Pelisson', 'Murilo'],
    },
  ];

  const [teams, setTeams] = useState(defaultTeams);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [history, setHistory] = useState([]);
  const [matchStarted, setMatchStarted] = useState(false);
  const startMatch = () => setMatchStarted(true);
  console.log(selectedTeams);
  return (
    <div className='app-container'>
      <h1 className='title'>Fuquinta</h1>

      {teams.length < 3 ? (
        <TeamSetup onSubmit={setTeams} />
      ) : selectedTeams.length < 2 ? (
        <div>
          <h2 className='title' style={{ fontSize: '1.2rem' }}>
            Escolha os dois times iniciais
          </h2>
          <div className='team-selection'>
            {teams.map((team, idx) => (
              <div
                key={idx}
                className={`team-button ${
                  selectedTeams.includes(idx) ? 'selected' : ''
                }`}
                onClick={() => setSelectedTeams((prev) => [...prev, idx])}
              >
                {team.name}
              </div>
            ))}
          </div>
        </div>
      ) : !matchStarted ? (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button onClick={startMatch}>Começar Partida</button>
        </div>
      ) : (
        <>
          <MatchController
            teams={teams}
            initialTeams={selectedTeams}
            addToHistory={setHistory}
            selectedTeams={selectedTeams}
          />
          <MatchHistory history={history} />
        </>
      )}
    </div>
  );
}
