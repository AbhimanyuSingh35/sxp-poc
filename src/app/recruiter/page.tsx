import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";


export default async function RecruiterDashboard() {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await clerkClient.users.getUser(userId);
  const userRole = user.publicMetadata.role;

  if (userRole !== "recruiter") {
    redirect("/");  // or to an "unauthorized" page
  }

  return (
    <div>
      <h1>Recruiter Dashboard</h1>
  
    </div>
  );
}