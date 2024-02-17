import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import LandingPage from './components/pages/LandingPage';
import ProjectsPage from './components/pages/ProjectsPage';
import ProjectPage from './components/pages/ProjectPage';
import AboutUs from './components/pages/AboutUs';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/proyectos-sociales/categorias/:category',
    element: <ProjectsPage />,
  },
  {
    path: '/proyectos-sociales/',
    element: <ProjectsPage />,
  },
  {
    path: '/proyectos-sociales/:id',
    element: <ProjectPage />,
  },
  {
    path: '/sobre-nosotros',
    element: <AboutUs />,
  },
]);

function App() {
  return (
    <Container fluid className="p-0">
      <main>
        <React.StrictMode>
          <RouterProvider router={router} />
        </React.StrictMode>
      </main>
    </Container>
  );
}

export default App;
