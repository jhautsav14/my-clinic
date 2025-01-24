'use client';
import { useState } from 'react';

// Import the respective pages/components
import QueueManagementPage from './queue/page';
import AppointmentManagementPage from './appointments/page';
import DoctorManagementPage from './doctors/page';

type Tab = 'queue' | 'appointments' | 'doctors';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<Tab>('queue');

  const handleLogout = () => {
    alert('Logging out...');
    // Add logout logic here (e.g., clear session or redirect)
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">Healthcare Management System</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600"
        >
          Log Out
        </button>
      </header>

      {/* Tabs */}
      <div className="mt-6 container mx-auto">
        <div className="flex justify-center space-x-6">
          <button
            onClick={() => setActiveTab('queue')}
            className={`px-6 py-3 text-lg font-medium rounded-t-lg ${activeTab === 'queue'
                ? 'bg-white text-blue-600 shadow-md border-b-4 border-blue-600'
                : 'text-gray-500 hover:text-blue-600'
              }`}
          >
            Queue Management
          </button>
          <button
            onClick={() => setActiveTab('appointments')}
            className={`px-6 py-3 text-lg font-medium rounded-t-lg ${activeTab === 'appointments'
                ? 'bg-white text-blue-600 shadow-md border-b-4 border-blue-600'
                : 'text-gray-500 hover:text-blue-600'
              }`}
          >
            Appointment Management
          </button>
          <button
            onClick={() => setActiveTab('doctors')}
            className={`px-6 py-3 text-lg font-medium rounded-t-lg ${activeTab === 'doctors'
                ? 'bg-white text-blue-600 shadow-md border-b-4 border-blue-600'
                : 'text-gray-500 hover:text-blue-600'
              }`}
          >
            Doctor Management
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="container mx-auto mt-6 p-6 bg-white rounded-lg shadow-lg">
        {activeTab === 'queue' && <QueueManagementPage />}
        {activeTab === 'appointments' && <AppointmentManagementPage />}
        {activeTab === 'doctors' && <DoctorManagementPage />}
      </div>
    </div>
  );
}
