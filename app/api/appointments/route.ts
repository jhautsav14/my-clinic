import { NextResponse } from 'next/server';

const appointments = [
    {
        "id": 1,
        "patientName": "John Doe",
        "doctorId": 1,
        "time": "10:30 AM",
        "status": "Booked"
    },
    {
        "id": 2,
        "patientName": "Jane Smith",
        "doctorId": 2,
        "time": "11:15 AM",
        "status": "Booked"
    },
    {
        "id": 3,
        "patientName": "Michael Lee",
        "doctorId": 3,
        "time": "2:00 PM",
        "status": "Canceled"
    }
];

export async function GET() {
    return NextResponse.json(appointments);
}
