import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import AdminDashboard from './AdminDashboard';
import { registerUser } from '../api/api';

interface Loan {
    id: number;
    fullName: string;
    email: string;
    amount: number;
    status: 'pending' | 'approved' | 'verified' | 'rejected';
}

const DashboardPage = () => {
    const { user, logout } = useAuth();
    const [loans, setLoans] = useState<Loan[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('admin');
    const [error, setError] = useState('');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await registerUser(name, email, password, role as 'admin');
            alert('Admin added');
            setIsModalOpen(false);
        } catch (err: any) {
            console.log('error is : ', err);
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    useEffect(() => {
        const fetchLoans = async () => {
            try {
                const res = await API.get('/applications');
                setRole(prev:any=>prev);
                setLoans(res.data);
            } catch (err) {
                console.error('❌ Failed to fetch loans:', err);
            }
        };

        if (user?.role !== 'user') {
            fetchLoans();
        }
    }, [user]);

    const handleStatusUpdate = async (
        id: number,
        action: 'verify' | 'approve' | 'reject'
    ) => {
        try {
            const res = await API.put(`/applications/${action}/${id}`);
            setLoans((prev) =>
                prev.map((loan) =>
                    loan.id === id ? { ...loan, status: res.data.status } : loan
                )
            );
        } catch (err) {
            console.error(`❌ Failed to ${action} loan:`, err);
        }
    };
    if (user?.role === 'user') {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-white px-4">
                <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-md w-full border border-red-200">
                    <h1 className="text-3xl font-bold text-red-600 mb-2 text-center">
                        🚫 Access Denied
                    </h1>
                    <p className="text-center text-gray-700 mb-6">
                        Sorry, you don't have permission to view this page.
                    </p>
                    <p className="text-center text-sm text-gray-500">
                        If you believe this is a mistake, please contact the admin for further access or try again later.
                    </p>
                </div>
            </div>
        );
    }


    return (<>
        <div className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between border-b border-gray-200">
            <h1 className="text-2xl font-bold text-blue-600 tracking-wide">
                EasyLoan <span className="text-gray-700">Manager</span>
            </h1>
        </div>
        {/* ✅ Greeting Section */}
        {(user?.role === 'admin' || user?.role === 'verifier') && (
            <div className="mb-2 p-6 bg-gradient-to-r from-indigo-100 to-blue-50 text-blue-900 border border-blue-200 rounded-2xl shadow-sm py-12">
                <h2 className="text-2xl font-bold mb-1">
                    Hi {user.role.charAt(0).toUpperCase() + user.role.slice(1)} {user?.name} 👋
                </h2>
                <p className="text-md text-blue-800">
                    Welcome back to your EasyLoan dashboard. Here you can review, verify, and manage all loan applications efficiently.
                </p>
            </div>
        )}

        <div className="p-6 bg-gradient-to-br from-indigo-100 to-blue-50 min-h-screen">

            <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-3xl p-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">📊 Loan Manager Dashboard</h1>
                    <button
                        onClick={logout}
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow"
                    >
                        Logout
                    </button>
                </div>

                <div className="overflow-x-auto rounded-xl border border-gray-200 shadow">
                    <table className="w-full text-sm text-left text-gray-600">
                        <thead className="text-xs uppercase bg-indigo-600 text-white">
                            <tr>
                                <th className="px-6 py-4">Borrower</th>
                                <th className="px-6 py-4">Email</th>
                                <th className="px-6 py-4">Amount</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loans.length > 0 ? (
                                loans.map((loan) => (
                                    <tr
                                        key={loan.id}
                                        className={`${loan.status === 'rejected'
                                            ? 'bg-red-50'
                                            : loan.status === 'approved'
                                                ? 'bg-green-50'
                                                : loan.status === 'verified'
                                                    ? 'bg-yellow-50'
                                                    : 'bg-white'
                                            } hover:bg-gray-100 transition duration-200`}
                                    >
                                        <td className="px-6 py-4 font-semibold text-gray-800">{loan.fullName}</td>
                                        <td className="px-6 py-4">{loan.email}</td>
                                        <td className="px-6 py-4">${loan.amount}</td>
                                        <td
                                            className={`px-6 py-4 capitalize font-semibold ${loan.status === 'rejected'
                                                ? 'text-red-600'
                                                : loan.status === 'approved'
                                                    ? 'text-green-600'
                                                    : loan.status === 'verified'
                                                        ? 'text-yellow-600'
                                                        : 'text-gray-600'
                                                }`}
                                        >
                                            {loan.status}
                                        </td>
                                        <td className="px-6 py-4 space-x-2 text-center">
                                            {user?.role === 'verifier' && (
                                                <>
                                                    <button
                                                        onClick={() => handleStatusUpdate(loan.id, 'verify')}
                                                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg shadow"
                                                    >
                                                        Verify
                                                    </button>
                                                    <button
                                                        onClick={() => handleStatusUpdate(loan.id, 'reject')}
                                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg shadow"
                                                    >
                                                        Reject
                                                    </button>
                                                </>
                                            )}
                                            {user?.role === 'admin' && (
                                                <>
                                                    <button
                                                        onClick={() => handleStatusUpdate(loan.id, 'approve')}
                                                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg shadow"
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        onClick={() => handleStatusUpdate(loan.id, 'reject')}
                                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg shadow"
                                                    >
                                                        Reject
                                                    </button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center py-6 text-gray-500">
                                        No applications found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {user?.role === 'admin' && (
                    <div className="flex justify-center mt-10">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:scale-105 transition-transform"
                        >
                            ➕ Add Admin
                        </button>
                    </div>
                )}

                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                        <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-xl">
                            <h2 className="text-2xl font-bold mb-4 text-gray-800">Add New Admin</h2>
                            <form onSubmit={handleRegister} className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    className="w-full border border-gray-300 p-3 rounded-lg"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="w-full border border-gray-300 p-3 rounded-lg"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="w-full border border-gray-300 p-3 rounded-lg"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                {error && <p className="text-red-600 text-sm">{error}</p>}
                                <div className="flex justify-end gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                    >
                                        Add Admin
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
            {user?.role === "admin" && <AdminDashboard />}
        </div></>
    );
};

export default DashboardPage;
