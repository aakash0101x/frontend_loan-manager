import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoanApplicationPage = () => {
  const { token, user } = useAuth();
  // const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form, setForm] = useState({
    fullName: '',
    email: user?.email || '',
    amount: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setRole(prev=>prev);
      const res = await axios.post(
        'https://backend-loan-manager.onrender.com/applications/submit',
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccess('Application submitted successfully!');
      setForm({ fullName: '', email: user?.email || '', amount: '' });
      setIsModalOpen(true);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'Submission failed');
    }
  };

  return (
    <>
      {/* Header */}
      <div className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between border-b border-gray-200">
        <h1 className="text-2xl font-bold text-blue-600 tracking-wide">
          EasyLoan <span className="text-gray-700">Manager</span>
        </h1>
      </div>

      {/* Body */}
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-blue-50 to-white px-4">
        {/* Promo Section */}
        <div className="text-center mb-8 max-w-xl">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-3 leading-tight">
            Affordable. Fast. Reliable.
          </h2>
          <p className="text-gray-600 text-lg">
            We provide the most affordable loans with quick approvals and minimal paperwork. Apply now and get closer to your financial goals!
          </p>
        </div>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md border border-blue-100"
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
            Apply for a Loan
          </h2>

          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          {success && <p className="text-green-600 mb-4 text-center">{success}</p>}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Loan Amount</label>
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition duration-200"
          >
            Submit Application
          </button>
        </form>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white p-6 rounded-xl shadow-2xl w-96 relative">
              <h2 className="text-2xl font-semibold mb-3 text-green-600 text-center">
                ✅ Application Submitted
              </h2>
              <p className="text-center text-gray-700 mb-6">We have received your loan application.</p>
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-2xl"
              >
                &times;
              </button>
              <div className="flex justify-center">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default LoanApplicationPage;
