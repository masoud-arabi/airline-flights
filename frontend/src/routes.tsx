import { createBrowserRouter } from 'react-router-dom';
import Airlines from './components/Airlines/Airlines';
import Airline from './components/Airline/Airline';

const router = createBrowserRouter([
  { path: "/", element: <Airlines /> },
  { path: "/airlines/:slug", element: <Airline /> },
  ]);

export default router;