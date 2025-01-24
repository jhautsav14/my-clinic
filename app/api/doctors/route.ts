import { NextResponse } from 'next/server';

let doctors = [
    {
        id: 1,
        name: 'Dr. John Doe',
        specialization: 'Cardiology',
        status: 'Available',
        nextAvailable: '10:30 AM',
        profilePic: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
        id: 2,
        name: 'Dr. Jane Smith',
        specialization: 'Dermatology',
        status: 'Busy',
        nextAvailable: '11:00 AM',
        profilePic: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
    {
        id: 3,
        name: 'Dr. Emily Brown',
        specialization: 'Pediatrics',
        status: 'Off Duty',
        nextAvailable: 'Tomorrow 9:00 AM',
        profilePic: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
    {
        id: 4,
        name: 'Dr. Mark Wilson',
        specialization: 'Orthopedics',
        status: 'Available',
        nextAvailable: '10:15 AM',
        profilePic: 'https://randomuser.me/api/portraits/men/4.jpg',
    },
    {
        id: 5,
        name: 'Dr. Sarah Connor',
        specialization: 'Neurology',
        status: 'Off Duty',
        nextAvailable: 'Tomorrow 8:30 AM',
        profilePic: 'https://randomuser.me/api/portraits/women/5.jpg',
    },
    {
        id: 6,
        name: 'Dr. Robert Taylor',
        specialization: 'Endocrinology',
        status: 'Busy',
        nextAvailable: '12:00 PM',
        profilePic: 'https://randomuser.me/api/portraits/men/6.jpg',
    },
    {
        id: 7,
        name: 'Dr. Laura Hill',
        specialization: 'Oncology',
        status: 'Available',
        nextAvailable: '10:45 AM',
        profilePic: 'https://randomuser.me/api/portraits/women/7.jpg',
    },
    {
        id: 8,
        name: 'Dr. Michael Green',
        specialization: 'Psychiatry',
        status: 'Busy',
        nextAvailable: '11:30 AM',
        profilePic: '',
    },
    {
        id: 9,
        name: 'Dr. Anna Lee',
        specialization: 'Gastroenterology',
        status: 'Off Duty',
        nextAvailable: 'Tomorrow 10:00 AM',
        profilePic: 'https://randomuser.me/api/portraits/women/8.jpg',
    },
];

export async function GET() {
    return NextResponse.json(doctors);
}
