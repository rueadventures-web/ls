import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface SuccessModalProps {
  show: boolean;
  onClose: () => void;
}

export function SuccessModal({ show, onClose }: SuccessModalProps) {
  const navigate = useNavigate();

  const handleGoToRequests = () => {
    onClose();
    navigate('/requests');
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Body className="text-center p-4">
        <div className="mb-3">
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: '#28a745',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
            }}
          >
            <span style={{ fontSize: '48px', color: 'white' }}>✓</span>
          </div>
        </div>
        <h4 className="mb-3">Request Submitted</h4>
        <p className="text-muted mb-4">
          You will receive an email once processing begins.
        </p>
        <Button variant="primary" onClick={handleGoToRequests}>
          View Requests
        </Button>
      </Modal.Body>
    </Modal>
  );
}

