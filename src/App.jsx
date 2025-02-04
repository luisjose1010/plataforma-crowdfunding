import AboutUsPage from '@/components/AboutUsPage';
import AdminManagerPage from '@/components/AdminManagerPage';
import LandingPage from '@/components/LandingPage';
import RootLayout from '@/components/layouts/RootLayout';
import LoginPage from '@/components/LoginPage';
import ProjectManagerPage from '@/components/ProjectManagerPage';
import ProjectPage from '@/components/ProjectPage';
import ProjectsPage from '@/components/ProjectsPage';
import UserManagerPage from '@/components/UserManagerPage';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import './App.css';

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
        element: <AboutUsPage />,
      },
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
