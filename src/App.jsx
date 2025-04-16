import { useState, useEffect } from 'react';
import TeamSetup from './components/TeamSetup';
import MatchController from './components/MatchController';
import MatchHistory from './components/MatchHistory';

const LOCAL_STORAGE_KEY = 'fuquinta-data';

const saveToLocalStorage = (data) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
};

const loadFromLocalStorage = () => {
  const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
  return saved ? JSON.parse(saved) : null;
};

const resetLocalStorage = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
  window.location.reload();
};

export default function App() {
  const defaultTeams = [
    {
      name: 'BOMBARDINO CROCCODRILO',
      players: ['Neves', 'Milani', 'Rossi', 'Math ale', 'Pato', 'Nick'],
    },
    {
      name: 'TUNG TUNG SAHUR',
      players: ['Arthur', 'Pires', 'Luan', 'Davi', 'Mizuno', 'Kevin'],
    },
    {
      name: 'SHIMPAZINNI BANANINNI',
      players: ['Zampar', 'Vini', 'Murilo', 'Pelisson', 'Chuera', 'Tineli'],
    },
  ];

  const savedData = loadFromLocalStorage();

  const [teams, setTeams] = useState(savedData?.teams || defaultTeams);
  const [selectedTeams, setSelectedTeams] = useState(
    savedData?.selectedTeams || []
  );
  const [history, setHistory] = useState(savedData?.history || []);
  const [matchStarted, setMatchStarted] = useState(
    savedData?.matchStarted || false
  );

  useEffect(() => {
    saveToLocalStorage({
      teams,
      selectedTeams,
      history,
      matchStarted,
    });
  }, [teams, selectedTeams, history, matchStarted]);

  const startMatch = () => setMatchStarted(true);

  const endMatch = () => setMatchStarted(false);

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
                onClick={() => {
                  if (
                    !selectedTeams.includes(idx) &&
                    selectedTeams.length < 2
                  ) {
                    setSelectedTeams((prev) => [...prev, idx]);
                  }
                }}
              >
                {team.name}
              </div>
            ))}
          </div>
          <button
            onClick={resetLocalStorage}
            style={{
              marginBottom: '1rem',
              width: '100%',
              background: 'red',
              marginTop: 32,
            }}
          >
            Resetar Semana
          </button>
        </div>
      ) : !matchStarted ? (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button onClick={startMatch}>Começar Partida</button>
        </div>
      ) : (
        <>
          <MatchController
            teams={teams}
            resetLocalStorage={resetLocalStorage}
            initialTeams={selectedTeams}
            addToHistory={setHistory}
            selectedTeams={selectedTeams}
            onMatchEnd={endMatch}
          />
          <MatchHistory history={history} />
        </>
      )}
    </div>
  );
}
