import { useState, useEffect } from 'react';

interface NhlPlayer {
  id: number;
  firstName: {
    default: string;
  };
  lastName: {
    default: string;
  };
  teamAbbrev: string;
  position: string;
  value: number; 
}

interface ApiResponse {
  points: NhlPlayer[];
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'points' | 'standings'>('points');
  const [players, setPlayers] = useState<NhlPlayer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchPlayers() {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5189/api/nhl/leaders');
        
        if (!response.ok) {
          throw new Error('Kunde inte hämta data från backenden');
        }

        const jsonData: ApiResponse = await response.json();
        
        setPlayers(jsonData.points);
      } catch (error) {
        console.error("Det blev fel vid hämtningen:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPlayers();
  }, []);

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 font-sans">
      
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-2xl font-black tracking-wider text-blue-500">NHL</span>
            <span className="text-xs font-semibold uppercase tracking-widest bg-slate-800 px-2 py-1 rounded text-slate-400">Live stats</span>
          </div>
          
          <nav className="space-y-1">
            <button 
              onClick={() => setActiveTab('points')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'points' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              🔥 Poängliga
            </button>
            <button 
              onClick={() => setActiveTab('standings')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'standings' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              📊 Tabell (Standings)
            </button>
          </nav>
        </div>
        
        <div className="p-4 border-t border-slate-800 text-xs text-slate-500 text-center">
          Kopplad mot .NET 10 API
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-8">
        
        {activeTab === 'points' && (
          <div className="max-w-5xl mx-auto space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Skater Stats Leaders</h1>
              <p className="text-slate-400 mt-1">Riktig livedata direkt från NHL via din C#-backend.</p>
            </div>

            {loading ? (
              <div className="text-slate-500 py-12 text-center animate-pulse">
                Hämtar statistik från servern...
              </div>
            ) : (
              <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-800/50 text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-slate-800">
                      <th className="py-4 px-6 text-center w-12">#</th>
                      <th className="py-4 px-6">Spelare</th>
                      <th className="py-4 px-6">Lag</th>
                      <th className="py-4 px-6">Pos</th>
                      <th className="py-4 px-6 text-center font-bold text-blue-400">P</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-sm">
                    {players.map((player, index) => (
                      <tr key={player.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="py-4 px-6 text-center font-medium text-slate-500">{index + 1}</td>
                        {/* Notera hur vi nu gräver djupare: player.firstName.default */}
                        <td className="py-4 px-6 font-semibold text-white">
                          {player.firstName.default} {player.lastName.default}
                        </td>
                        <td className="py-4 px-6">
                          <span className="bg-slate-800 px-2 py-1 rounded font-mono text-xs">{player.teamAbbrev}</span>
                        </td>
                        <td className="py-4 px-6 text-slate-400">{player.position}</td>
                        <td className="py-4 px-6 text-center font-bold text-blue-400 bg-blue-500/5">{player.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'standings' && (
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold tracking-tight">Tabell</h1>
            <p className="text-slate-400 mt-1">Här kommer division- och konferensrankingen att ligga.</p>
            <div className="mt-8 p-12 text-center border-2 border-dashed border-slate-800 rounded-xl text-slate-500">
              Hämtas från .NET-backenden inom kort...
            </div>
          </div>
        )}

      </main>
    </div>
  );
}