import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import PrivateRoute from './routes/PrivateRoute';
import RegisterPage from './pages/RegisterPage';
import LoanApplicationPage from './pages/LoanApplicationPage';


const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/register" />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/loan-application" element={<LoanApplicationPage />} />

    </Routes>
  );
};

export default App;
