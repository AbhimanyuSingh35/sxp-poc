'use client';

import { useSignUp } from "@clerk/nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";

const roles = ["recruiter", "jobseeker", "employer"];

export default function CustomSignUp() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [role, setRole] = useState("");
  const router = useRouter();

  // Form submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress: email,
        password
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // Verify the email code
  const onPressVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (completeSignUp.status !== "complete") {
        /*  investigate the response, to see if there was an error
         or if the user needs to complete more steps.*/
        console.log(JSON.stringify(completeSignUp, null, 2));
      }
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        
        // Here we'll update the user's metadata with their chosen role
        const user = completeSignUp.createdUserId;
        // You'll need to implement this API route
        await fetch("/api/updateUserRole", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user, role }),
        });

        // Redirect based on role
        router.push(`/${role}`);
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <div>
      {!pendingVerification && (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
            />
          </div>
          <div>
            <label htmlFor="role">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              id="role"
            >
              <option value="">Select a role</option>
              {roles.map((r) => (
                <option key={r} value={r}>
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <button>Sign Up</button>
        </form>
      )}
      {pendingVerification && (
        <form onSubmit={onPressVerify}>
          <input
            value={code}
            placeholder="Code..."
            onChange={(e) => setCode(e.target.value)}
          />
          <button>Verify Email</button>
        </form>
      )}
    </div>
  );
}