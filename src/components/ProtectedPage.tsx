import React, { FC, PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuthContext } from '../context/authContext';

export const ProtectedPage: FC<PropsWithChildren> = ({ children }) => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  });

  return <div>{children}</div>;
};
