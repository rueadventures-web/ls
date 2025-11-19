import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Container, Button, Spinner, Alert, Row, Col, Table } from 'react-bootstrap';
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

  return (
    <Layout>
      <div className="bg-light" style={{ minHeight: '100vh', paddingTop: '2rem', paddingBottom: '2rem' }}>
        <Container style={{ maxWidth: '1000px' }}>
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
