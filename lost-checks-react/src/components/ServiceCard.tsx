import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import type { Service } from '../api/types';

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/affidavit/new');
  };

  return (
    <Card 
      className="h-100"
      style={{
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        transition: 'all 0.3s ease-in-out',
        overflow: 'hidden'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 1px 2px 0 rgb(0 0 0 / 0.05)';
      }}
    >
      <Card.Body className="d-flex flex-column" style={{ padding: '2rem' }}>
        <Card.Title 
          style={{
            fontSize: '1.5rem',
            fontWeight: 600,
            color: '#1e293b',
            marginBottom: '1rem'
          }}
        >
          {service.name}
        </Card.Title>
        <Card.Text 
          className="flex-grow-1"
          style={{
            color: '#64748b',
            lineHeight: 1.6,
            marginBottom: '1.5rem',
            fontSize: '1rem'
          }}
        >
          {service.description}
        </Card.Text>
        <Button 
          variant="primary" 
          onClick={handleStart}
          style={{
            marginTop: 'auto',
            borderRadius: '8px',
            fontWeight: 500,
            padding: '0.625rem 1.5rem',
            transition: 'all 0.2s ease-in-out'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          Start
        </Button>
      </Card.Body>
    </Card>
  );
}
