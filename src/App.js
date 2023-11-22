import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Container from 'react-bootstrap/Container';

import LandingPage from './components/pages/LandingPage';


const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage></LandingPage>,
  },
  {
    path: "/proyectos-sociales/:category?",
    element: <LandingPage></LandingPage>,
  },
]);


function App() {
  return (
    <Container fluid className='p-0'>
      <main>
        <React.StrictMode>
          <RouterProvider router={router} />
        </React.StrictMode>
      </main>
    </Container>
  );
}

export default App;
