import { useUser, UserButton } from '@clerk/nextjs';

const Navbar = () => {
  const { user } = useUser();

  return (
    <nav>
      <ul>
        <li><a href="/dashboard/recruiter">Recruiter Dashboard</a></li>
        <li><a href="/dashboard/jobseeker">Job Seeker Dashboard</a></li>
        <li><a href="/dashboard/employer">Employer Dashboard</a></li>
        {user ? <UserButton /> : <a href="/sign-in">Sign In</a>}
      </ul>
    </nav>
  );
};

export default Navbar;
