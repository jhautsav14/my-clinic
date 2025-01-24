import './globals.css';

export const metadata = {
  title: 'Front Desk Management',
  description: 'Manage doctors, appointments, and queues.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen bg-gray-100">{children}</main>
      </body>
    </html>
  );
}
