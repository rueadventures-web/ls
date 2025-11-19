import { Modal, Button } from 'react-bootstrap';
import type { PacketData } from '../api/useAffidavitPacketQuery';

interface PacketPreviewModalProps {
  show: boolean;
  onClose: () => void;
  data: PacketData | null;
}

export function PacketPreviewModal({ show, onClose, data }: PacketPreviewModalProps) {
  if (!data) return null;

  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Affidavit Packet Preview</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: '70vh', overflowY: 'auto', padding: '2rem' }}>
        <div className="packet-preview" style={{ backgroundColor: '#fff' }}>
          {/* Header with Logo Placeholder */}
          <div className="text-center mb-4" style={{ borderBottom: '2px solid #333', paddingBottom: '20px' }}>
            <div
              style={{
                width: '120px',
                height: '80px',
                border: '2px solid #ccc',
                margin: '0 auto 15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f8f9fa',
                borderRadius: '4px',
              }}
            >
              <span style={{ color: '#999', fontSize: '0.875rem' }}>County Logo</span>
            </div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>
              FDSD Services
            </div>
            <div style={{ fontSize: '18px', color: '#666' }}>
              Lost Check Affidavit – Preview Packet
            </div>
          </div>

          {/* Participant Information */}
          <div className="mb-4">
            <h5
              style={{
                borderBottom: '1px solid #ddd',
                paddingBottom: '10px',
                marginBottom: '20px',
                fontSize: '1.1rem',
                fontWeight: 600,
              }}
            >
              Participant Information
            </h5>
            <div className="row mb-3">
              <div className="col-4">
                <strong style={{ color: '#666' }}>Participant Name:</strong>
              </div>
              <div className="col-8">{data.participant_name}</div>
            </div>
            <div className="row mb-3">
              <div className="col-4">
                <strong style={{ color: '#666' }}>Case Number:</strong>
              </div>
              <div className="col-8">{data.case_number}</div>
            </div>
            <div className="row mb-3">
              <div className="col-4">
                <strong style={{ color: '#666' }}>Affidavit Reason:</strong>
              </div>
              <div className="col-8">{data.reason}</div>
            </div>
            <div className="row mb-3">
              <div className="col-4">
                <strong style={{ color: '#666' }}>Date Reported:</strong>
              </div>
              <div className="col-8">{data.date_reported}</div>
            </div>
          </div>

          {/* Check Information */}
          <div className="mb-4">
            <h5
              style={{
                borderBottom: '1px solid #ddd',
                paddingBottom: '10px',
                marginBottom: '20px',
                fontSize: '1.1rem',
                fontWeight: 600,
              }}
            >
              Check Information
            </h5>
            <table className="table table-bordered">
              <thead className="table-light">
                <tr>
                  <th>Check Number</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Bank</th>
                  <th>Issue Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {data.checks.map((check, index) => (
                  <tr key={index}>
                    <td>{check.check_number}</td>
                    <td>{check.date}</td>
                    <td>${check.amount}</td>
                    <td>{check.bank}</td>
                    <td>{check.issue_date}</td>
                    <td>
                      <span
                        style={{
                          padding: '0.25rem 0.5rem',
                          borderRadius: '4px',
                          fontSize: '0.875rem',
                          fontWeight: 500,
                          backgroundColor:
                            check.status === 'Issued'
                              ? '#fef3c7'
                              : check.status === 'Paid'
                              ? '#d1fae5'
                              : '#e5e7eb',
                          color:
                            check.status === 'Issued'
                              ? '#92400e'
                              : check.status === 'Paid'
                              ? '#065f46'
                              : '#374151',
                        }}
                      >
                        {check.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Signature Section */}
          <div className="mb-4" style={{ marginTop: '50px' }}>
            <div style={{ borderTop: '1px solid #000', paddingTop: '30px' }}>
              <div className="row">
                <div className="col-6">
                  <div style={{ marginBottom: '60px' }}>
                    <div
                      style={{
                        borderBottom: '2px solid #000',
                        width: '250px',
                        marginBottom: '8px',
                        height: '40px',
                      }}
                    ></div>
                    <div style={{ fontSize: '12px', color: '#666' }}>Participant Signature</div>
                  </div>
                </div>
                <div className="col-6">
                  <div style={{ marginBottom: '60px' }}>
                    <div
                      style={{
                        borderBottom: '2px solid #000',
                        width: '200px',
                        marginBottom: '8px',
                        height: '40px',
                      }}
                    ></div>
                    <div style={{ fontSize: '12px', color: '#666' }}>Date</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stamp Placeholder */}
          <div className="text-center mt-5">
            <div
              style={{
                border: '2px dashed #999',
                padding: '25px',
                display: 'inline-block',
                borderRadius: '5px',
                color: '#999',
                backgroundColor: '#f8f9fa',
                minWidth: '200px',
              }}
            >
              [Official Stamp Placeholder]
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
