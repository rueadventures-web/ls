import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="text-center mt-5">
        <h1 className="mb-3">FDSD Services</h1>
        <p className="lead mb-4">Select a category below to continue</p>
        <Button
          variant="primary"
          size="lg"
          onClick={() => navigate('/services')}
        >
          View Available Services
        </Button>
      </div>
    </Layout>
  );
}

