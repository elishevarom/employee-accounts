import React, { useEffect } from 'react';
import { signOut } from 'aws-amplify/auth';
import { useNavigate } from 'react-router-dom';

export const SignOut = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/'); // Adjust path as needed
    } catch (error) {
    }
  };

  useEffect(() => {
    handleSignOut();
  });

  return null

};

export default SignOut;
