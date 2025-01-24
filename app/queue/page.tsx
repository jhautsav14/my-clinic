'use client';
import { useState, useEffect } from 'react';

type Patient = {
    id: number;
    name: string;
    queueNumber: number;
    status: 'Waiting' | 'With Doctor';
    priority: 'Normal' | 'Urgent';
    arrivalTime: string;
    estimatedWaitTime: string;
};

export default function QueuePage() {
    const [queue, setQueue] = useState<Patient[]>([]);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState<'All' | 'Waiting' | 'With Doctor'>('All');
    const [showForm, setShowForm] = useState(false);
    const [newPatient, setNewPatient] = useState<Partial<Patient>>({
        name: '',
        status: 'Waiting',
        priority: 'Normal',
        arrivalTime: '',
        estimatedWaitTime: '',
    });

    useEffect(() => {
        fetch('/api/queue')
            .then((res) => res.json())
            .then((data: Patient[]) => setQueue(data));
    }, []);

    const filteredQueue = queue.filter(
        (patient) =>
            (filter === 'All' || patient.status === filter) &&
            patient.name.toLowerCase().includes(search.toLowerCase())
    );

    const addNewPatient = () => {
        if (
            newPatient.name &&
            newPatient.status &&
            newPatient.priority &&
            newPatient.arrivalTime &&
            newPatient.estimatedWaitTime
        ) {
            const newQueueNumber = queue.length > 0 ? queue[queue.length - 1].queueNumber + 1 : 1;
            const patient: Patient = {
                id: Date.now(),
                name: newPatient.name,
                queueNumber: newQueueNumber,
                status: newPatient.status as 'Waiting' | 'With Doctor',
                priority: newPatient.priority as 'Normal' | 'Urgent',
                arrivalTime: newPatient.arrivalTime,
                estimatedWaitTime: newPatient.estimatedWaitTime,
            };

            setQueue((prev) => [...prev, patient]);
            setShowForm(false);
            setNewPatient({
                name: '',
                status: 'Waiting',
                priority: 'Normal',
                arrivalTime: '',
                estimatedWaitTime: '',
            });
        } else {
            alert('Please fill out all fields before submitting.');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewPatient((prev) => ({ ...prev, [name]: value }));
    };

    const updateStatus = (patientId: number, status: 'Waiting' | 'With Doctor') => {
        setQueue((prev) =>
            prev.map((patient) =>
                patient.id === patientId ? { ...patient, status } : patient
            )
        );
    };

    const updatePriority = (patientId: number, priority: 'Normal' | 'Urgent') => {
        setQueue((prev) =>
            prev.map((patient) =>
                patient.id === patientId ? { ...patient, priority } : patient
            )
        );
    };

    const removePatient = (patientId: number) => {
        setQueue((prev) => prev.filter((patient) => patient.id !== patientId));
    };

    return (
        <div className="container mx-auto p-4 bg-gray-100 text-gray-900">
            {/* Top Section: Filter and Search */}
            <div className="flex justify-between items-center mb-6 gap-4">
                {/* Filter Dropdown */}
                <div className="flex items-center gap-2">
                    <span className="text-gray-600">Filter:</span>
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value as 'All' | 'Waiting' | 'With Doctor')}
                        className="bg-white text-gray-900 px-4 py-2 rounded-lg border border-gray-300"
                    >
                        <option value="All">All</option>
                        <option value="Waiting">Waiting</option>
                        <option value="With Doctor">With Doctor</option>
                    </select>
                </div>

                {/* Search Box */}
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        placeholder="Search patients"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="bg-white text-gray-900 px-4 py-2 rounded-lg border border-gray-300 w-72"
                    />
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                        <i className="fas fa-search"></i> Search
                    </button>
                </div>
            </div>

            {/* Add New Patient Button */}
            <div className="mt-6 text-center">
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-gray-800 text-white px-6 py-3 rounded-lg border border-gray-700"
                >
                    Add New Patient to Queue
                </button>
            </div>

            {/* Add New Patient Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-lg font-bold mb-4">Add New Patient</h2>
                        <div className="space-y-4">
                            {/* Name */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={newPatient.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter patient name"
                                    className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                                />
                            </div>

                            {/* Status */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Status</label>
                                <select
                                    name="status"
                                    value={newPatient.status}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                                >
                                    <option value="Waiting">Waiting</option>
                                    <option value="With Doctor">With Doctor</option>
                                </select>
                            </div>

                            {/* Priority */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Priority</label>
                                <select
                                    name="priority"
                                    value={newPatient.priority}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                                >
                                    <option value="Normal">Normal</option>
                                    <option value="Urgent">Urgent</option>
                                </select>
                            </div>

                            {/* Arrival Time */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Arrival Time</label>
                                <input
                                    type="time"
                                    name="arrivalTime"
                                    value={newPatient.arrivalTime}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                                />
                            </div>

                            {/* Estimated Wait Time */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Estimated Wait Time</label>
                                <input
                                    type="text"
                                    name="estimatedWaitTime"
                                    value={newPatient.estimatedWaitTime}
                                    onChange={handleInputChange}
                                    placeholder="Enter estimated wait time (e.g., 15 mins)"
                                    className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                                />
                            </div>

                            {/* Add and Cancel Buttons */}
                            <button
                                onClick={addNewPatient}
                                className="bg-blue-500 text-white px-6 py-3 rounded-lg mt-4 w-full"
                            >
                                Add Patient
                            </button>
                            <button
                                onClick={() => setShowForm(false)}
                                className="bg-red-500 text-white px-6 py-3 rounded-lg mt-2 w-full"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Patient List */}
            <div className="space-y-4">
                {filteredQueue.map((patient) => (
                    <div
                        key={patient.id}
                        className={`p-4 rounded-lg shadow-md border-4 flex items-center gap-4 ${patient.priority === 'Urgent' ? 'border-red-200/80' : 'border-gray-300'
                            } bg-white`}
                    >
                        {/* Queue Number */}
                        <div className="text-lg font-bold text-gray-700 w-12 text-center">
                            {patient.queueNumber}
                        </div>

                        {/* Patient Details */}
                        <div className="flex-grow">
                            {/* Row 1: Name and Status */}
                            <div className="mb-2">
                                <p className="text-gray-600">{patient.name}</p>
                                <p
                                    className={`font-semibold ${patient.status === 'Waiting' ? 'text-yellow-500' : 'text-green-500'
                                        }`}
                                >
                                    {patient.status === 'Waiting' ? (
                                        <span>🕒 Waiting</span>
                                    ) : (
                                        <span>👨‍⚕️ With Doctor</span>
                                    )}
                                </p>
                            </div>

                            {/* Row 2: Arrival Time and Estimated Wait Time */}
                            <div className="flex justify-between text-gray-600 mb-2">
                                <p>Arrival: {patient.arrivalTime}</p>
                                <p>Est. Wait: {patient.estimatedWaitTime}</p>
                            </div>

                            {/* Row 3: Dropdowns */}
                            <div className="flex gap-4">
                                {/* Status Dropdown */}
                                <select
                                    value={patient.status}
                                    onChange={(e) =>
                                        updateStatus(patient.id, e.target.value as 'Waiting' | 'With Doctor')
                                    }
                                    className="bg-white text-gray-900 px-4 py-2 rounded-lg border border-gray-300"
                                >
                                    <option value="Waiting">Waiting</option>
                                    <option value="With Doctor">With Doctor</option>
                                </select>

                                {/* Priority Dropdown */}
                                <select
                                    value={patient.priority}
                                    onChange={(e) =>
                                        updatePriority(patient.id, e.target.value as 'Normal' | 'Urgent')
                                    }
                                    className="bg-white text-gray-900 px-4 py-2 rounded-lg border border-gray-300"
                                >
                                    <option value="Normal">Normal</option>
                                    <option value="Urgent">Urgent</option>
                                </select>
                            </div>
                        </div>

                        {/* Remove Button */}
                        <button
                            onClick={() => removePatient(patient.id)}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                        >
                            X
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
