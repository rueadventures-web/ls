import { Row, Col, Spinner, Alert } from 'react-bootstrap';
import { Layout } from '../components/Layout';
import { ServiceCard } from '../components/ServiceCard';
import { useServicesQuery } from '../api/useServicesQuery';

export function ServicesPage() {
  const { data: services, isLoading, error } = useServicesQuery();

  return (
    <Layout>
      <h1 className="mb-4">Available Services</h1>
      {isLoading && (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      {error && (
        <Alert variant="danger">
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
    </Layout>
  );
}

