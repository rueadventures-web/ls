import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Container, Button, Spinner, Alert, Row, Col, Table, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Layout } from '../components/Layout';
import { PacketPreviewModal } from '../components/PacketPreviewModal';
import { PacketDownloadButton } from '../components/PacketDownloadButton';
import { useAffidavitPacketQuery } from '../api/useAffidavitPacketQuery';

export function PacketPreviewPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const packetId = id ? parseInt(id, 10) : 0;
  const { data, isLoading, error } = useAffidavitPacketQuery(packetId);
  const [showPreview, setShowPreview] = useState(false);

  // Desk Actions State
  const [scssReviewRequired, setScssReviewRequired] = useState(false);
  const [packetType, setPacketType] = useState('');
  const [internalComments, setInternalComments] = useState('');
  const [newInternalComment, setNewInternalComment] = useState('');
  const [lcdAction, setLcdAction] = useState('');
  const [lcdActionComment, setLcdActionComment] = useState('');

  const handlePostComment = () => {
    if (newInternalComment.trim()) {
      setInternalComments(prev => prev + (prev ? '\n\n' : '') + newInternalComment);
      setNewInternalComment('');
    }
  };

  const handleGeneratePacket = () => {
    if (packetType) {
      alert(`Generating ${packetType} packet...`);
    } else {
      alert('Please select a packet type first.');
    }
  };

  const handleUpdateRequest = () => {
    if (lcdAction) {
      alert(`Updating request with action: ${lcdAction}`);
    } else {
      alert('Please select an LCD Action first.');
    }
  };

  const lcdActionTooltip = (
    <Tooltip id="lcd-action-tooltip">
      This action is visible to requestors.
    </Tooltip>
  );

  const lcdCommentTooltip = (
    <Tooltip id="lcd-comment-tooltip">
      This comment is visible to requestors.
    </Tooltip>
  );

  return (
    <Layout>
      <div className="bg-light" style={{ minHeight: '100vh', paddingTop: '2rem', paddingBottom: '2rem' }}>
        <Container style={{ maxWidth: '1200px' }}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">Packet Preview</h2>
            <Button variant="outline-secondary" onClick={() => navigate('/requests')}>
              Back
            </Button>
          </div>

          {isLoading && (
            <div className="text-center py-5">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          )}

          {error && (
            <Alert variant="danger">
              Failed to load packet data. Please try again later.
            </Alert>
          )}

          {data && (
            <>
              {/* Affidavit Information Card */}
              <Card className="mb-4 shadow-sm">
                <Card.Header className="bg-white">
                  <h4 className="mb-0">Affidavit Information</h4>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col md={6}>
                      <div className="mb-4">
                        <h5 className="text-muted mb-2" style={{ fontSize: '0.875rem', fontWeight: 600 }}>
                          Participant Name
                        </h5>
                        <p className="mb-0" style={{ fontSize: '1.1rem' }}>
                          {data.participant_name}
                        </p>
                      </div>
                      <div className="mb-4">
                        <h5 className="text-muted mb-2" style={{ fontSize: '0.875rem', fontWeight: 600 }}>
                          Case Number
                        </h5>
                        <p className="mb-0" style={{ fontSize: '1.1rem' }}>
                          {data.case_number}
                        </p>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="mb-4">
                        <h5 className="text-muted mb-2" style={{ fontSize: '0.875rem', fontWeight: 600 }}>
                          Affidavit Reason
                        </h5>
                        <p className="mb-0" style={{ fontSize: '1.1rem' }}>
                          {data.reason}
                        </p>
                      </div>
                      <div className="mb-4">
                        <h5 className="text-muted mb-2" style={{ fontSize: '0.875rem', fontWeight: 600 }}>
                          Date Reported
                        </h5>
                        <p className="mb-0" style={{ fontSize: '1.1rem' }}>
                          {data.date_reported}
                        </p>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>

              {/* Check Information Card */}
              <Card className="mb-4 shadow-sm">
                <Card.Header className="bg-white">
                  <h4 className="mb-0">Check Information</h4>
                </Card.Header>
                <Card.Body>
                  <Table responsive striped bordered hover>
                    <thead className="table-light">
                      <tr>
                        <th>Check Number</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Bank</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.checks.map((check, index) => (
                        <tr key={index}>
                          <td>{check.check_number}</td>
                          <td>{check.date}</td>
                          <td>${check.amount}</td>
                          <td>{check.bank}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>

              {/* Preview/Download Buttons */}
              <div className="d-flex gap-3 justify-content-center mb-4">
                <Button
                  variant="outline-primary"
                  size="lg"
                  onClick={() => setShowPreview(true)}
                >
                  Preview Modal
                </Button>
                <PacketDownloadButton data={data} />
              </div>

              {/* Lost Checks Desk Actions Section */}
              <Card className="mb-4 shadow-sm">
                <Card.Header style={{ backgroundColor: '#d4edda', borderBottom: '2px solid #c3e6cb' }}>
                  <h4 className="mb-0">Lost Checks Desk Actions</h4>
                </Card.Header>
                <Card.Body>
                  {/* SCSS Review Indicator */}
                  <div className="mb-4">
                    <Form.Group>
                      <Form.Check
                        type="checkbox"
                        id="scss-review"
                        label="SCSS Review Required"
                        checked={scssReviewRequired}
                        onChange={(e) => setScssReviewRequired(e.target.checked)}
                      />
                    </Form.Group>
                  </div>

                  {/* Packet Type */}
                  <div className="mb-4">
                    <Row>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Packet Type</Form.Label>
                          <Form.Select
                            value={packetType}
                            onChange={(e) => setPacketType(e.target.value)}
                          >
                            <option value="">- Select -</option>
                            <option value="Affidavit">Affidavit</option>
                            <option value="Fraud">Fraud</option>
                            <option value="Rejection">Rejection</option>
                            <option value="Fraud Rejection">Fraud Rejection</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={6} className="d-flex align-items-end">
                        <Button
                          variant="secondary"
                          onClick={handleGeneratePacket}
                          disabled={!packetType}
                          style={{ minWidth: '150px' }}
                        >
                          Generate Packet
                        </Button>
                      </Col>
                    </Row>
                  </div>

                  {/* Internal Comments/Messages */}
                  <div className="mb-4">
                    <Form.Group>
                      <Form.Label>Internal Comments/Messages</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={6}
                        value={internalComments}
                        readOnly
                        style={{ backgroundColor: '#f8f9fa' }}
                      />
                    </Form.Group>
                    <div className="d-flex gap-2 mt-2">
                      <Form.Control
                        type="text"
                        placeholder="Add internal comment..."
                        value={newInternalComment}
                        onChange={(e) => setNewInternalComment(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handlePostComment();
                          }
                        }}
                      />
                      <Button variant="primary" onClick={handlePostComment}>
                        Post &gt;
                      </Button>
                    </div>
                    <small className="text-muted">(Internal use only - not visible to requestors)</small>
                  </div>
                </Card.Body>
              </Card>

              {/* Lost Checks Desk Response Section */}
              <Card className="mb-4 shadow-sm">
                <Card.Header style={{ backgroundColor: '#d4edda', borderBottom: '2px solid #c3e6cb' }}>
                  <h4 className="mb-0">Lost Checks Desk Response</h4>
                </Card.Header>
                <Card.Body>
                  {/* LCD Action */}
                  <div className="mb-4">
                    <Form.Group>
                      <Form.Label>
                        LCD Action
                        <OverlayTrigger placement="top" overlay={lcdActionTooltip}>
                          <span className="ms-2" style={{ cursor: 'help', color: '#0d6efd' }}>
                            ℹ️
                          </span>
                        </OverlayTrigger>
                      </Form.Label>
                      <Form.Select
                        value={lcdAction}
                        onChange={(e) => setLcdAction(e.target.value)}
                      >
                        <option value="">- Select -</option>
                        <option value="Cancel per Requestor's Request">Cancel per Requestor's Request</option>
                        <option value="Reject Request">Reject Request</option>
                        <option value="Packet Generated">Packet Generated</option>
                        <option value="Packet Returned/Processed">Packet Returned/Processed</option>
                      </Form.Select>
                    </Form.Group>
                  </div>

                  {/* LCD Action Comment */}
                  <div className="mb-4">
                    <Form.Group>
                      <Form.Label>
                        LCD Action Comment
                        <OverlayTrigger placement="top" overlay={lcdCommentTooltip}>
                          <span className="ms-2" style={{ cursor: 'help', color: '#0d6efd' }}>
                            ℹ️
                          </span>
                        </OverlayTrigger>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={lcdActionComment}
                        onChange={(e) => setLcdActionComment(e.target.value)}
                        placeholder="Enter comment visible to requestors..."
                      />
                    </Form.Group>
                  </div>

                  {/* Update Request Button */}
                  <div className="d-flex justify-content-end">
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={handleUpdateRequest}
                      disabled={!lcdAction}
                      style={{ minWidth: '200px', backgroundColor: '#6f42c1', borderColor: '#6f42c1' }}
                    >
                      Update Request
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </>
          )}

          <PacketPreviewModal
            show={showPreview}
            onClose={() => setShowPreview(false)}
            data={data || null}
          />
        </Container>
      </div>
    </Layout>
  );
}
