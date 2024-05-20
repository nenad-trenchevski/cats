import { Typography } from '@mui/material';
import React from 'react';

interface LayoutProps {
  error: string | null;
  children: React.ReactNode;
}

const MainLayout = ({ error, children }: LayoutProps) => {
  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  return <>{children}</>;
};

export default MainLayout;
