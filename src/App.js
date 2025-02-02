import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import RootLayout from './components/layouts/RootLayout';
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
    path: '/login',
    element: <LoginPage />,
  },
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <LandingPage />,
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
    ],
  },
]);

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
