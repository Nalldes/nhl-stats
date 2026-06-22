import { useState } from 'react';

// 1. Vi definierar hur en NHL-spelare ser ut (TypeScript-magi!)
interface NhlPlayer {
  id: number;
  firstName: string;
  lastName: string;
  teamAbbr: string;
  position: string;
  gamesPlayed: number;
  goals: number;
  assists: number;
  points: number;
}

export default function App() {
  // 2. State för att hålla koll på vilken flik i menyn som är aktiv
  const [activeTab, setActiveTab] = useState<'points' | 'standings'>('points');

  // 3. Statisk testdata som matchar NHL:s datastruktur för poängligan
  const mockPlayers: NhlPlayer[] = [
    { id: 8478402, firstName: "Connor", lastName: "McDavid", teamAbbr: "EDM", position: "C", gamesPlayed: 82, goals: 42, assists: 90, points: 132 },
    { id: 8477956, firstName: "David", lastName: "Pastrnak", teamAbbr: "BOS", position: "RW", gamesPlayed: 82, goals: 47, assists: 63, points: 110 },
    { id: 8480069, firstName: "Cale", lastName: "Makar", teamAbbr: "COL", position: "D", gamesPlayed: 77, goals: 21, assists: 68, points: 89 },
    { id: 8471675, firstName: "Sidney", lastName: "Crosby", teamAbbr: "PIT", position: "C", gamesPlayed: 82, goals: 33, assists: 53, points: 86 },
  ];

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 font-sans">
      
      {/* SIDOFÄLT (Sidebar) */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-2xl font-black tracking-wider text-blue-500">NHL</span>
            <span className="text-xs font-semibold uppercase tracking-widest bg-slate-800 px-2 py-1 rounded text-slate-400">Stats v1.0</span>
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
          Utvecklad med .NET 10 & React
        </div>
      </aside>

      {/* HUVUDINNEHÅLL (Main Content) */}
      <main className="flex-1 overflow-y-auto p-8">
        
        {/* FLIK 1: POÄNGLIGA */}
        {activeTab === 'points' && (
          <div className="max-w-5xl mx-auto space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Skater Stats Leaders</h1>
              <p className="text-slate-400 mt-1">Högsta poängplockarna i ligan just nu.</p>
            </div>

            {/* TABELL */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-800/50 text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-slate-800">
                    <th className="py-4 px-6 text-center w-12">#</th>
                    <th className="py-4 px-6">Spelare</th>
                    <th className="py-4 px-6">Lag</th>
                    <th className="py-4 px-6">Pos</th>
                    <th className="py-4 px-6 text-center">SM</th>
                    <th className="py-4 px-6 text-center">M</th>
                    <th className="py-4 px-6 text-center">A</th>
                    <th className="py-4 px-6 text-center font-bold text-blue-400">P</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-sm">
                  {mockPlayers.map((player, index) => (
                    <tr key={player.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-4 px-6 text-center font-medium text-slate-500">{index + 1}</td>
                      <td className="py-4 px-6 font-semibold text-white">{player.firstName} {player.lastName}</td>
                      <td className="py-4 px-6"><span className="bg-slate-800 px-2 py-1 rounded font-mono text-xs">{player.teamAbbr}</span></td>
                      <td className="py-4 px-6 text-slate-400">{player.position}</td>
                      <td className="py-4 px-6 text-center">{player.gamesPlayed}</td>
                      <td className="py-4 px-6 text-center">{player.goals}</td>
                      <td className="py-4 px-6 text-center">{player.assists}</td>
                      <td className="py-4 px-6 text-center font-bold text-blue-400 bg-blue-500/5">{player.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* FLIK 2: TABELL */}
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