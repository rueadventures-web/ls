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
    <Card className="h-100">
      <Card.Body className="d-flex flex-column">
        <Card.Title>{service.name}</Card.Title>
        <Card.Text className="flex-grow-1">{service.description}</Card.Text>
        <Button variant="primary" onClick={handleStart}>
          Start
        </Button>
      </Card.Body>
    </Card>
  );
}

