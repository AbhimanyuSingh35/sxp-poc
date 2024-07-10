'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSignUp } from '@clerk/nextjs';

const CustomSignUpPage = () => {
  const [role, setRole] = useState('jobseeker');
  const router = useRouter();
  const { isLoaded, signUp, setActive } = useSignUp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress: email,
        password,
      });
      
      await signUp.update({
        unsafeMetadata: { role },
      });
      
      const completeSignUp = await signUp.prepareEmailAddressVerification();
      if (completeSignUp.status !== "complete") {
        console.log(JSON.stringify(completeSignUp, null, 2));
      }
      
      await setActive({ session: completeSignUp.createdSessionId });
      router.push(`/dashboard/${role}`);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSignUp}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <select value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="jobseeker">Job Seeker</option>
          <option value="recruiter">Recruiter</option>
          <option value="employer">Employer</option>
        </select>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default CustomSignUpPage;