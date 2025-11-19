import { Form, Row, Col, Button } from 'react-bootstrap';
import type { Check } from '../api/types';

interface CheckFormProps {
  check: Check;
  index: number;
  onChange: (index: number, field: keyof Check, value: string) => void;
  onRemove: (index: number) => void;
  canRemove: boolean;
}

export function CheckForm({ check, index, onChange, onRemove, canRemove }: CheckFormProps) {
  return (
    <div 
      className="mb-3"
      style={{
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '1.5rem',
        backgroundColor: '#f8fafc'
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 
          style={{
            fontSize: '1.25rem',
            fontWeight: 600,
            color: '#1e293b',
            margin: 0
          }}
        >
          Check {index + 1}
        </h5>
        {canRemove && (
          <Button 
            variant="outline-danger" 
            size="sm" 
            onClick={() => onRemove(index)}
            style={{
              borderRadius: '6px',
              fontWeight: 500
            }}
          >
            Remove
          </Button>
        )}
      </div>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: 500 }}>Check Number</Form.Label>
            <Form.Control
              type="text"
              value={check.checkNumber}
              onChange={(e) => onChange(index, 'checkNumber', e.target.value)}
              required
              style={{ borderRadius: '8px' }}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: 500 }}>Check Amount</Form.Label>
            <Form.Control
              type="text"
              value={check.checkAmount}
              onChange={(e) => onChange(index, 'checkAmount', e.target.value)}
              placeholder="$0.00"
              required
              style={{ borderRadius: '8px' }}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: 500 }}>Check Date</Form.Label>
            <Form.Control
              type="date"
              value={check.checkDate}
              onChange={(e) => onChange(index, 'checkDate', e.target.value)}
              required
              style={{ borderRadius: '8px' }}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: 500 }}>Bank Name</Form.Label>
            <Form.Control
              type="text"
              value={check.bankName}
              onChange={(e) => onChange(index, 'bankName', e.target.value)}
              required
              style={{ borderRadius: '8px' }}
            />
          </Form.Group>
        </Col>
      </Row>
      <Form.Group className="mb-3">
        <Form.Label style={{ fontWeight: 500 }}>Notes</Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          value={check.notes}
          onChange={(e) => onChange(index, 'notes', e.target.value)}
          style={{ borderRadius: '8px' }}
        />
      </Form.Group>
    </div>
  );
}
