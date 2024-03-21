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
import LoginPage from './components/pages/LoginPage';
import UserManagerPage from './components/pages/UserManagerPage';
import ProjectManagerPage from './components/pages/ProjectManagerPage';
import AdminManagerPage from './components/pages/AdminManagerPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/usuario',
    element: <UserManagerPage />,
  },
  {
    path: '/administrador/:editMode',
    element: <AdminManagerPage />,
  },
  {
    path: '/proyectos/:id/:editMode?',
    element: <ProjectManagerPage />,
  },
  {
    path: '/proyectos/crear',
    element: <ProjectManagerPage />,
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
