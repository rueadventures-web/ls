import { Row, Col, Spinner, Alert } from 'react-bootstrap';
import { Layout } from '../components/Layout';
import { ServiceCard } from '../components/ServiceCard';
import { useServicesQuery } from '../api/useServicesQuery';

export function ServicesPage() {
  const { data: services, isLoading, error } = useServicesQuery();

  return (
    <Layout>
      <div style={{ paddingTop: '1rem' }}>
        <h1 
          className="mb-4"
          style={{
            fontSize: '2.5rem',
            fontWeight: 700,
            color: '#1e293b',
            marginBottom: '2rem'
          }}
        >
          Available Services
        </h1>
        {isLoading && (
          <div className="text-center py-5">
            <Spinner animation="border" role="status" style={{ color: '#2563eb' }}>
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
        {error && (
          <Alert variant="danger" style={{ borderRadius: '12px', border: 'none' }}>
            Failed to load services. Please try again later.
          </Alert>
        )}
        {services && (
          <Row>
            {services.map((service) => (
              <Col key={service.id} md={4} className="mb-4">
                <ServiceCard service={service} />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </Layout>
  );
}
