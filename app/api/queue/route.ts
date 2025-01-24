import { NextResponse } from 'next/server';

let queue = [
    {
        id: 1,
        name: 'John Doe',
        queueNumber: 1,
        status: 'Waiting',
        arrivalTime: '9:00 AM',
        estimatedWaitTime: '15 mins',
    },
    {
        id: 2,
        name: 'Jane Smith',
        queueNumber: 2,
        status: 'With Doctor',
        arrivalTime: '9:10 AM',
        estimatedWaitTime: '10 mins',
    },
    {
        id: 3,
        name: 'Emily Brown',
        queueNumber: 3,
        status: 'Waiting',
        arrivalTime: '9:20 AM',
        estimatedWaitTime: '20 mins',
    },
];

export async function GET() {
    return NextResponse.json(queue);
}

export async function POST(req: Request) {
    const data = await req.json();
    const newPatient = {
        ...data,
        id: Date.now(),
        queueNumber: queue.length + 1,
        status: 'Waiting',
        arrivalTime: new Date().toLocaleTimeString(),
        estimatedWaitTime: '15 mins',
    };
    queue.push(newPatient);
    return NextResponse.json(newPatient);
}

export async function PATCH(req: Request) {
    const data = await req.json();
    const patientIndex = queue.findIndex((p) => p.id === data.id);
    if (patientIndex !== -1) {
        queue[patientIndex].status = data.status;
        return NextResponse.json(queue[patientIndex]);
    }
    return NextResponse.json({ error: 'Patient not found' }, { status: 404 });
}
