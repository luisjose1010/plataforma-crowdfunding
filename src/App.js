import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Container from 'react-bootstrap/Container';

import LandingPage from './components/pages/LandingPage';
import ProjectsPage from './components/pages/ProjectsPage';


const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage></LandingPage>,
  },
  {
    path: "/proyectos-sociales/:category?",
    element: <ProjectsPage></ProjectsPage>,
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
