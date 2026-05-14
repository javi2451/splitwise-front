'use client';
import { useForm } from 'react-hook-form';
import { createExpense } from '../lib/api';

export default function ExpenseForm({ users, onSuccess }: { users: any[], onSuccess: () => void }) {
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data: any) => {
        const payload = {
            description: data.description,
            amount: parseFloat(data.amount),
            payerId: parseInt(data.payerId),
            userIds: data.userIds.map((id: string) => parseInt(id)),
        };

        await createExpense(payload);
        reset();
        onSuccess(); // Esto recargará los balances automáticamente
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-12 bg-vynx-darkPurple/5 border border-vynx-purple/20 p-8 rounded-3xl">
            <h3 className="text-xl font-bold text-vynx-purple mb-6">Nuevo Gasto</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                    {...register('description')}
                    placeholder="¿En qué gastaste?"
                    className="bg-black border border-gray-800 p-4 rounded-xl outline-none focus:border-vynx-purple transition-colors"
                />
                <input
                    {...register('amount')}
                    type="number"
                    placeholder="Monto ($)"
                    className="bg-black border border-gray-800 p-4 rounded-xl outline-none focus:border-vynx-purple transition-colors"
                />
            </div>

            <div className="mt-6">
                <label className="text-xs text-gray-500 uppercase font-bold tracking-widest">¿Quién pagó?</label>
                <select {...register('payerId')} className="w-full bg-black border border-gray-800 p-4 rounded-xl mt-2 text-gray-300">
                    {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                </select>
            </div>

            <div className="mt-6">
                <label className="text-xs text-gray-500 uppercase font-bold tracking-widest">Participantes</label>
                <div className="flex gap-4 mt-2">
                    {users.map(u => (
                        <label key={u.id} className="flex items-center space-x-2 bg-black p-3 rounded-xl border border-gray-800 cursor-pointer hover:border-vynx-purple transition-all">
                            <input type="checkbox" value={u.id} {...register('userIds')} className="accent-vynx-purple w-4 h-4" />
                            <span className="text-sm font-medium">{u.name}</span>
                        </label>
                    ))}
                </div>
            </div>

            <button type="submit" className="w-full mt-8 bg-vynx-purple hover:bg-purple-600 text-white font-black py-4 rounded-xl transition-all shadow-lg shadow-purple-900/20">
                REGISTRAR EN SplitWise
            </button>
        </form>
    );
}