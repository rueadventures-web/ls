import { Container } from 'react-bootstrap';
import { Header } from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <Container className="mb-5" style={{ maxWidth: '1200px' }}>
        {children}
      </Container>
    </>
  );
}

