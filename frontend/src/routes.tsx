import { createBrowserRouter } from 'react-router-dom';
import Airlines from './components/Airlines/Airlines';
import Airline from './components/Airline/Airline';
import UpdateReview from './components/Airline/UpdateReview';

const router = createBrowserRouter([
  { path: "/", element: <Airlines /> },
  { path: "/airlines/:slug", element: <Airline /> },
  // { path: "/airlines/:slug/reviews/:id", element: <UpdateReview /> },
  ]);

export default router;