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
    <div className="border rounded p-3 mb-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5>Check {index + 1}</h5>
        {canRemove && (
          <Button variant="outline-danger" size="sm" onClick={() => onRemove(index)}>
            Remove
          </Button>
        )}
      </div>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Check Number</Form.Label>
            <Form.Control
              type="text"
              value={check.checkNumber}
              onChange={(e) => onChange(index, 'checkNumber', e.target.value)}
              required
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Check Amount</Form.Label>
            <Form.Control
              type="text"
              value={check.checkAmount}
              onChange={(e) => onChange(index, 'checkAmount', e.target.value)}
              placeholder="$0.00"
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Check Date</Form.Label>
            <Form.Control
              type="date"
              value={check.checkDate}
              onChange={(e) => onChange(index, 'checkDate', e.target.value)}
              required
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Bank Name</Form.Label>
            <Form.Control
              type="text"
              value={check.bankName}
              onChange={(e) => onChange(index, 'bankName', e.target.value)}
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <Form.Group className="mb-3">
        <Form.Label>Notes</Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          value={check.notes}
          onChange={(e) => onChange(index, 'notes', e.target.value)}
        />
      </Form.Group>
    </div>
  );
}

