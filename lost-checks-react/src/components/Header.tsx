import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <Navbar bg="white" expand="lg" className="mb-0" style={{ boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}>
      <Container>
        <Navbar.Brand 
          as={Link} 
          to="/"
          style={{ 
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#2563eb',
            textDecoration: 'none'
          }}
        >
          FDSD Services
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link 
              as={Link} 
              to="/"
              style={{ 
                fontWeight: 500,
                color: '#64748b',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#2563eb';
                e.currentTarget.style.backgroundColor = 'rgba(37, 99, 235, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#64748b';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/requests"
              style={{ 
                fontWeight: 500,
                color: '#64748b',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#2563eb';
                e.currentTarget.style.backgroundColor = 'rgba(37, 99, 235, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#64748b';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              Requests
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
