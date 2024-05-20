import { createBrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import Cats from './pages/Cats';
import { Typography } from '@mui/material';

export const router = createBrowserRouter([
  {
    path: AppRoutes.CATS,
    element: <Cats />,
  },
  {
    path: '*',
    element: <Typography>Not found</Typography>,
  },
]);
