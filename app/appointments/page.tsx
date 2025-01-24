'use client';
import { useState, useEffect } from 'react';

type Doctor = {
    id: number;
    name: string;
    profilePic?: string;
};

type Appointment = {
    id: number;
    patientName: string;
    doctorId: number;
    time: string;
    status: 'Booked' | 'Canceled';
};

export default function AppointmentManagementPage() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [mergedData, setMergedData] = useState<any[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [newAppointment, setNewAppointment] = useState<Partial<Appointment>>({
        patientName: '',
        doctorId: undefined,
        time: '',
        status: 'Booked',
    });

    useEffect(() => {
        // Fetch appointments
        fetch('/api/appointments')
            .then((res) => res.json())
            .then((data: Appointment[]) => setAppointments(data));

        // Fetch doctors
        fetch('/api/doctors')
            .then((res) => res.json())
            .then((data: Doctor[]) => setDoctors(data));
    }, []);

    useEffect(() => {
        // Merge doctor data into appointments
        if (appointments.length > 0 && doctors.length > 0) {
            const merged = appointments.map((appointment) => {
                const doctor = doctors.find((doc) => doc.id === appointment.doctorId);
                return {
                    ...appointment,
                    doctorName: doctor?.name || 'Unknown Doctor',
                    doctorProfilePic: doctor?.profilePic || '/default-profile.png',
                };
            });
            setMergedData(merged);
        }
    }, [appointments, doctors]);

    const updateAppointmentStatus = (appointmentId: number, status: 'Booked' | 'Canceled') => {
        setAppointments((prev) =>
            prev.map((appointment) =>
                appointment.id === appointmentId ? { ...appointment, status } : appointment
            )
        );
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewAppointment((prev) => ({ ...prev, [name]: value }));
    };

    const handleScheduleAppointment = () => {
        if (newAppointment.patientName && newAppointment.doctorId && newAppointment.time) {
            const newAppointmentId = Date.now();
            const appointment: Appointment = {
                id: newAppointmentId,
                patientName: newAppointment.patientName as string,
                doctorId: Number(newAppointment.doctorId),
                time: newAppointment.time as string,
                status: 'Booked',
            };

            setAppointments((prev) => [...prev, appointment]);
            setShowForm(false);
            setNewAppointment({ patientName: '', doctorId: undefined, time: '', status: 'Booked' });
        } else {
            alert('Please fill out all fields.');
        }
    };

    return (
        <div className="container mx-auto p-4 bg-gray-100 text-gray-900">
            <h1 className="text-2xl font-bold mb-6">Appointment Management</h1>

            {/* Schedule New Appointment Button */}
            <div className="mb-6 text-center">
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-gray-800 text-white px-6 py-3 rounded-lg border border-gray-700"
                >
                    Schedule New Appointment
                </button>
            </div>

            {/* Add New Appointment Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-lg font-bold mb-2">Schedule New Appointment</h2>
                        <p className="text-gray-500 mb-6">Enter the appointment details</p>
                        <div className="space-y-4">
                            {/* Patient Name */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Patient</label>
                                <input
                                    type="text"
                                    name="patientName"
                                    value={newAppointment.patientName}
                                    onChange={handleInputChange}
                                    placeholder="Enter patient name"
                                    className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                                />
                            </div>

                            {/* Doctor Dropdown */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Doctor</label>
                                <select
                                    name="doctorId"
                                    value={newAppointment.doctorId}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                                >
                                    <option value="">Select a doctor</option>
                                    {doctors.map((doctor) => (
                                        <option key={doctor.id} value={doctor.id}>
                                            {doctor.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Time */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Time</label>
                                <input
                                    type="time"
                                    name="time"
                                    value={newAppointment.time}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                                />
                            </div>

                            {/* Schedule Appointment Button */}
                            <button
                                onClick={handleScheduleAppointment}
                                className="bg-blue-500 text-white px-6 py-3 rounded-lg mt-4 w-full"
                            >
                                Schedule Appointment
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

            {/* Appointment List */}
            <div className="space-y-4">
                {mergedData.map((appointment) => (
                    <div
                        key={appointment.id}
                        className="p-4 bg-white rounded-lg shadow-md flex justify-between items-center border border-gray-300"
                    >
                        {/* Column 1: Patient and Doctor Info */}
                        <div className="flex items-center gap-4">
                            {/* Patient Name */}
                            <p className="text-lg font-bold text-gray-700">{appointment.patientName}</p>

                            {/* Doctor Info */}
                            <div className="flex items-center gap-2">
                                {/* Doctor Profile Picture */}
                                <img
                                    src={appointment.doctorProfilePic}
                                    alt={appointment.doctorName}
                                    className="w-10 h-10 rounded-full border border-gray-300 object-cover"
                                />
                                <div>
                                    <p className="text-gray-500">{appointment.doctorName}</p>
                                    {/* Time Icon and Time */}
                                    <p className="text-sm text-gray-400 flex items-center gap-1">
                                        <i className="fas fa-clock"></i> {appointment.time}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Column 2: Status and Dropdown */}
                        <div className="flex items-center gap-4">
                            {/* Status Label */}
                            <span
                                className={`px-3 py-1 rounded-full text-sm font-medium ${appointment.status === 'Booked'
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-red-500 text-white'
                                    }`}
                            >
                                {appointment.status}
                            </span>

                            {/* Status Dropdown */}
                            <select
                                value={appointment.status}
                                onChange={(e) =>
                                    updateAppointmentStatus(appointment.id, e.target.value as 'Booked' | 'Canceled')
                                }
                                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg border border-gray-300"
                            >
                                <option value="Booked">Booked</option>
                                <option value="Canceled">Canceled</option>
                            </select>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
