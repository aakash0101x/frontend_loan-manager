import React, { useState, useEffect } from 'react';

interface LoanFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (loan: { borrower: string; amount: number; status: 'approved' | 'pending' | 'rejected' }, id?: number) => void;
  initialData?: {
    id: number;
    borrower: string;
    amount: number;
    status: 'approved' | 'pending' | 'rejected';
  };
}

const LoanFormModal: React.FC<LoanFormModalProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [borrower, setBorrower] = useState('');
  const [amount, setAmount] = useState(0);
  const [status, setStatus] = useState<'approved' | 'pending' | 'rejected'>('pending');

  useEffect(() => {
    if (initialData) {
      setBorrower(initialData.borrower);
      setAmount(initialData.amount);
      setStatus(initialData.status);
    } else {
      setBorrower('');
      setAmount(0);
      setStatus('pending');
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ borrower, amount, status }, initialData?.id);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-bold mb-4">
          {initialData ? 'Edit Loan' : 'Add New Loan'}
        </h2>
        <input
          type="text"
          placeholder="Borrower Name"
          value={borrower}
          onChange={(e) => setBorrower(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          required
          className="w-full border p-2 rounded"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as any)}
          className="w-full border p-2 rounded"
        >
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {initialData ? 'Update' : 'Add'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoanFormModal;
