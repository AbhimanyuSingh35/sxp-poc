import { useUser } from '@clerk/nextjs';

export default function EmployerDashboard() {
  const { user } = useUser();

  return (
    <div>
      <h1>Employer Dashboard</h1>
      <p>Welcome, {user?.firstName}!</p>
    </div>
  );
}