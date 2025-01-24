'use client';
import { useEffect, useState } from 'react';

type Doctor = {
    id: number;
    name: string;
    specialization: string;
    status: 'Available' | 'Busy' | 'Off Duty'; // Add "Off Duty" status
    nextAvailable: string; // e.g., "10:30 AM"
    profilePic?: string; // Optional profile picture URL
};

export default function DoctorsPage() {
    const [doctors, setDoctors] = useState<Doctor[]>([]);

    // Fetch doctors data
    useEffect(() => {
        fetch('/api/doctors')
            .then((res) => res.json())
            .then((data: Doctor[]) => setDoctors(data));
    }, []);

    const viewSchedule = (doctorId: number) => {
        // Placeholder function for viewing schedule
        alert(`Viewing schedule for doctor ID: ${doctorId}`);
    };

    const defaultProfilePic = '/default-profile.png'; // Path to the default image

    const getStatusBorderColor = (status: 'Available' | 'Busy' | 'Off Duty') => {
        switch (status) {
            case 'Available':
                return 'border-green-500';
            case 'Busy':
                return 'border-red-500';
            case 'Off Duty':
                return 'border-yellow-500';
            default:
                return 'border-gray-300';
        }
    };

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-2xl font-bold mb-4">Available Doctors</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {doctors.map((doctor) => (
                    <div
                        key={doctor.id}
                        className="p-4 bg-white rounded-lg shadow-md border border-gray-200"
                    >
                        <div className="flex items-center mb-4">
                            {/* Circular Profile Photo with Dynamic Border Color */}
                            <img
                                src={doctor.profilePic || defaultProfilePic}
                                alt={doctor.name}
                                className={`w-16 h-16 rounded-full object-cover border-4 ${getStatusBorderColor(
                                    doctor.status
                                )}`}
                            />
                            <div className="ml-4">
                                <h2 className="text-lg font-bold">{doctor.name}</h2>
                                <p className="text-gray-500">{doctor.specialization}</p>
                            </div>
                        </div>
                        <p>
                            Status:{' '}
                            <span
                                className={`font-semibold ${doctor.status === 'Available'
                                        ? 'text-green-500'
                                        : doctor.status === 'Busy'
                                            ? 'text-red-500'
                                            : 'text-yellow-500'
                                    }`}
                            >
                                {doctor.status}
                            </span>
                        </p>
                        <p>Next Available: {doctor.nextAvailable}</p>
                        <button
                            onClick={() => viewSchedule(doctor.id)}
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
                        >
                            View Schedule
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
