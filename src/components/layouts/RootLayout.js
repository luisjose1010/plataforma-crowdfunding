import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Navbar from '../hooks/NavBar';
import Footer from '../hooks/Footer';

function RootLayout() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <Container fluid className="p-0">
        <Outlet />
      </Container>
      <Footer />
    </>
  );
}

export default RootLayout;
