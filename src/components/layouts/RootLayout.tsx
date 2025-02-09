import Footer from '@/components/Footer';
import Navbar from '@/components/NavBar';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

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
