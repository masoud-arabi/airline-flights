import { createBrowserRouter } from 'react-router-dom';
import Airlines from './components/Airlines/Airlines';
import Airline from './components/Airline/Airline';
import Login from './components/Screens/Login'
import Signup from './components/Screens/Signup';

const router = createBrowserRouter([
  { path: "/", element: <Airlines /> },
  { path: "/airlines/:slug", element: <Airline/> },
  {path: "/login", element: <Login />},
  {path: "/signup", element: <Signup />}
  ]);

export default router;
