import { Tabs, Tab, Table, Badge, Spinner, Alert } from 'react-bootstrap';
import { Layout } from '../components/Layout';
import { useDraftsQuery } from '../api/useDraftsQuery';
import { useSubmittedQuery } from '../api/useRequestsQuery';
import { useCompletedQuery } from '../api/useRequestsQuery';

function RequestTable({ requests }: { requests: any[] }) {
  if (requests.length === 0) {
    return <p className="text-muted">No requests found.</p>;
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Participant Name</th>
          <th>Case Number</th>
          <th>Status</th>
          <th>Last Updated</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {requests.map((request) => (
          <tr key={request.id}>
            <td>{request.participant_name}</td>
            <td>{request.case_number}</td>
            <td>
              <Badge
                bg={
                  request.status === 'Completed'
                    ? 'success'
                    : request.status === 'Submitted'
                    ? 'primary'
                    : 'secondary'
                }
              >
                {request.status || 'Draft'}
              </Badge>
            </td>
            <td>{request.updated_at}</td>
            <td>
              <button className="btn btn-sm btn-outline-primary" disabled>
                Open
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
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
      <h1 className="mb-4">Requests Dashboard</h1>
      {hasError && (
        <Alert variant="danger">
          Failed to load requests. Please try again later.
        </Alert>
      )}
      {isLoading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Tabs defaultActiveKey="drafts" className="mb-3">
          <Tab eventKey="drafts" title="Drafts">
            <RequestTable requests={drafts || []} />
          </Tab>
          <Tab eventKey="submitted" title="Submitted">
            <RequestTable requests={submitted || []} />
          </Tab>
          <Tab eventKey="completed" title="Completed">
            <RequestTable requests={completed || []} />
          </Tab>
        </Tabs>
      )}
    </Layout>
  );
}

