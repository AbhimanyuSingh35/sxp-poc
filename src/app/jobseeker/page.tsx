import { useUser } from '@clerk/nextjs';

export default function JobSeekerDashboard() {
  const { user } = useUser();

  return (
    <div>
      <h1>Job Seeker Dashboard</h1>
      <p>Welcome, {user?.firstName}!</p>
    </div>
  );
}