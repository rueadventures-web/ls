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
    <Modal 
      show={show} 
      onHide={onClose} 
      centered
      style={{ borderRadius: '12px' }}
    >
      <Modal.Body 
        className="text-center"
        style={{
          padding: '3rem 2rem',
          borderRadius: '12px'
        }}
      >
        <div className="mb-4">
          <div
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              backgroundColor: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
            }}
          >
            <span style={{ fontSize: '56px', color: 'white', fontWeight: 'bold' }}>✓</span>
          </div>
        </div>
        <h4 
          className="mb-3"
          style={{
            fontSize: '1.75rem',
            fontWeight: 600,
            color: '#1e293b'
          }}
        >
          Request Submitted
        </h4>
        <p 
          className="text-muted mb-4"
          style={{
            fontSize: '1.1rem',
            color: '#64748b',
            lineHeight: 1.6
          }}
        >
          You will receive an email once processing begins.
        </p>
        <Button 
          variant="primary" 
          onClick={handleGoToRequests}
          size="lg"
          style={{
            borderRadius: '8px',
            fontWeight: 500,
            padding: '0.75rem 2rem'
          }}
        >
          View Requests
        </Button>
      </Modal.Body>
    </Modal>
  );
}
