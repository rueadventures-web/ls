import { Tabs, Tab, Table, Badge, Spinner, Alert, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { useDraftsQuery } from '../api/useDraftsQuery';
import { useSubmittedQuery } from '../api/useRequestsQuery';
import { useCompletedQuery } from '../api/useRequestsQuery';

function RequestTable({ requests, showPacketLink = false }: { requests: any[]; showPacketLink?: boolean }) {
  const navigate = useNavigate();

  if (requests.length === 0) {
    return (
      <div className="text-center py-5">
        <p className="text-muted" style={{ fontSize: '1.1rem' }}>No requests found.</p>
      </div>
    );
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <Table 
        striped 
        bordered 
        hover
        style={{
          borderRadius: '12px',
          overflow: 'hidden',
          backgroundColor: 'white'
        }}
      >
        <thead style={{ backgroundColor: '#f8fafc' }}>
          <tr>
            <th style={{ padding: '1rem', fontWeight: 600 }}>Participant Name</th>
            <th style={{ padding: '1rem', fontWeight: 600 }}>Case Number</th>
            <th style={{ padding: '1rem', fontWeight: 600 }}>Status</th>
            <th style={{ padding: '1rem', fontWeight: 600 }}>Last Updated</th>
            <th style={{ padding: '1rem', fontWeight: 600 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td style={{ padding: '1rem' }}>{request.participant_name}</td>
              <td style={{ padding: '1rem' }}>{request.case_number}</td>
              <td style={{ padding: '1rem' }}>
                <Badge
                  bg={
                    request.status === 'Completed'
                      ? 'success'
                      : request.status === 'Submitted'
                      ? 'primary'
                      : 'secondary'
                  }
                  style={{
                    padding: '0.5rem 0.75rem',
                    borderRadius: '6px',
                    fontWeight: 500
                  }}
                >
                  {request.status || 'Draft'}
                </Badge>
              </td>
              <td style={{ padding: '1rem' }}>{request.updated_at}</td>
              <td style={{ padding: '1rem' }}>
                {showPacketLink ? (
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => navigate(`/affidavit/packet-preview/${request.id}`)}
                    style={{
                      borderRadius: '6px',
                      fontWeight: 500
                    }}
                  >
                    View Packet
                  </Button>
                ) : (
                  <Button 
                    variant="outline-secondary" 
                    size="sm" 
                    disabled
                    style={{
                      borderRadius: '6px',
                      fontWeight: 500
                    }}
                  >
                    Open
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export function RequestsDashboard() {
  const {
    data: drafts,
    isLoading: draftsLoading,
    error: draftsError,
  } = useDraftsQuery();
  const {
    data: submitted,
    isLoading: submittedLoading,
    error: submittedError,
  } = useSubmittedQuery();
  const {
    data: completed,
    isLoading: completedLoading,
    error: completedError,
  } = useCompletedQuery();

  const isLoading = draftsLoading || submittedLoading || completedLoading;
  const hasError = draftsError || submittedError || completedError;

  return (
    <Layout>
      <div style={{ paddingTop: '1rem' }}>
        <h1 
          className="mb-4"
          style={{
            fontSize: '2.5rem',
            fontWeight: 700,
            color: '#1e293b',
            marginBottom: '2rem'
          }}
        >
          Requests Dashboard
        </h1>
        {hasError && (
          <Alert variant="danger" style={{ borderRadius: '12px', border: 'none' }}>
            Failed to load requests. Please try again later.
          </Alert>
        )}
        {isLoading ? (
          <div className="text-center py-5">
            <Spinner animation="border" role="status" style={{ color: '#2563eb' }}>
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <Card className="shadow-sm" style={{ border: 'none', borderRadius: '12px', overflow: 'hidden' }}>
            <Card.Body style={{ padding: '0' }}>
              <Tabs 
                defaultActiveKey="drafts" 
                className="mb-0"
                style={{
                  borderBottom: '2px solid #e2e8f0'
                }}
              >
                <Tab 
                  eventKey="drafts" 
                  title={
                    <span style={{ fontWeight: 500, padding: '0.75rem 1rem' }}>
                      Drafts
                    </span>
                  }
                >
                  <div style={{ padding: '1.5rem' }}>
                    <RequestTable requests={drafts || []} showPacketLink={false} />
                  </div>
                </Tab>
                <Tab 
                  eventKey="submitted" 
                  title={
                    <span style={{ fontWeight: 500, padding: '0.75rem 1rem' }}>
                      Submitted
                    </span>
                  }
                >
                  <div style={{ padding: '1.5rem' }}>
                    <RequestTable requests={submitted || []} showPacketLink={true} />
                  </div>
                </Tab>
                <Tab 
                  eventKey="completed" 
                  title={
                    <span style={{ fontWeight: 500, padding: '0.75rem 1rem' }}>
                      Completed
                    </span>
                  }
                >
                  <div style={{ padding: '1.5rem' }}>
                    <RequestTable requests={completed || []} showPacketLink={true} />
                  </div>
                </Tab>
              </Tabs>
            </Card.Body>
          </Card>
        )}
      </div>
    </Layout>
  );
}
