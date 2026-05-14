'use client';
import { useEffect, useState } from 'react';
import { getBalance, getUsers } from '../lib/api';
import ExpenseForm from '../components/ExpenseForm';

export default function Home() {
  const [balance, setBalance] = useState<any>(null);
  const [users, setUsers] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(1);
  const [loading, setLoading] = useState(false);
  // UN SOLO useEffect que reacciona al cambio de usuario
  useEffect(() => {
    refreshData();
  }, [currentUserId]);

  const refreshData = async () => {
    setLoading(true); // Empezamos a cargar
    try {
      const b = await getBalance(currentUserId);
      const u = await getUsers();
      setBalance(b);
      setUsers(u);
    } finally {
      setLoading(false); // Terminamos de cargar
    }
  };

  return (
    <main className="min-h-screen bg-vynx-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10 flex justify-between items-end border-b border-vynx-purple/20 pb-6">
          <div>
            <h1 className="text-4xl font-bold text-vynx-purple">SplitWise</h1>
            <p className="text-gray-500 text-xs uppercase tracking-widest mt-1">Dashboard de Gastos</p>
          </div>

          {/* AQUÍ USAMOS setCurrentUserId para que deje de estar opaco */}
          <div className="text-right">
            <label className="block text-[10px] text-gray-500 uppercase mb-1 font-bold">Cambiar de perfil</label>
            <select
              value={currentUserId}
              onChange={(e) => setCurrentUserId(parseInt(e.target.value))}
              className="bg-black border border-vynx-purple/30 text-vynx-purple text-sm p-2 rounded-lg outline-none focus:border-vynx-purple"
            >
              {users.map((u: any) => (
                <option key={u.id} value={u.id}>{u.name}</option>
              ))}
            </select>
          </div>
        </header>

        {/* ... Aquí van tus 3 tarjetas de balance (Net Balance, Paid, Debt) ... */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card Balance */}
          <div className="bg-gradient-to-br from-vynx-darkPurple/30 to-vynx-black border border-vynx-purple/40 p-8 rounded-3xl">
            <h2 className="text-xs uppercase tracking-widest text-vynx-purple font-bold">Net Balance</h2>
            <p className={`text-6xl font-black mt-4 ${(!loading && balance && balance.netBalance >= 0) ? 'text-green-400' : (!loading && balance && balance.netBalance < 0) ? 'text-red-400' : 'text-gray-500'}`}>
              {loading || !balance ? <span className="animate-pulse">...</span> : `$${balance.netBalance}`}
            </p>
          </div>
          {/* Card Total Paid */}
          <div className="bg-vynx-darkPurple/5 border border-gray-900 p-8 rounded-3xl">
            <h2 className="text-xs uppercase tracking-widest text-gray-500 font-bold">Total Paid</h2>
            <p className="text-4xl mt-4 text-white font-light">
              {loading || !balance ? <span className="animate-pulse text-gray-600">...</span> : `$${balance.totalPaid}`}
            </p>
          </div>
          {/* Card Total Debt */}
          <div className="bg-vynx-darkPurple/5 border border-gray-900 p-8 rounded-3xl">
            <h2 className="text-xs uppercase tracking-widest text-gray-500 font-bold">Total Debt</h2>
            <p className="text-4xl mt-4 text-white font-light">
              {loading || !balance ? <span className="animate-pulse text-gray-600">...</span> : `$${balance.totalDebt}`}
            </p>
          </div>
        </div>

        {/* Formulario de gastos */}
        <ExpenseForm users={users} onSuccess={refreshData} />
      </div>
    </main>
  );
}