import { useEffect, useState } from 'react';
import { fetchAllAdmins, deleteAdminById } from '../api/api';

const AdminDashboard = () => {
  const [admins, setAdmins] = useState([]);

  const loadAdmins = async () => {
    const data = await fetchAllAdmins();
    setAdmins(data);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this admin?')) {
      await deleteAdminById(id);
      loadAdmins();
    }
  };

  useEffect(() => {
    loadAdmins();
  }, []);

  return (
    <div className="p-8 bg-gradient-to-r from-blue-50 to-indigo-100 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-3xl p-8">
        <h2 className="text-4xl font-extrabold mb-8 text-gray-800 text-center">
          🛠️ Admin Dashboard
        </h2>
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs uppercase bg-gradient-to-r from-indigo-500 to-blue-500 text-white">
              <tr>
                <th scope="col" className="px-6 py-4">ID</th>
                <th scope="col" className="px-6 py-4">Name</th>
                <th scope="col" className="px-6 py-4">Email</th>
                <th scope="col" className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin: any, index) => (
                <tr
                  key={admin.id}
                  className={`${
                    index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                  } hover:bg-gray-100 transition duration-200`}
                >
                  <td className="px-6 py-4 font-medium text-gray-900">{admin.id}</td>
                  <td className="px-6 py-4">{admin.name}</td>
                  <td className="px-6 py-4">{admin.email}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleDelete(admin.id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow-lg transition-all duration-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {admins.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-gray-500">
                    No admins found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
