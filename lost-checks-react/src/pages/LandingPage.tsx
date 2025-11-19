import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div 
        className="text-center"
        style={{
          paddingTop: '4rem',
          paddingBottom: '4rem',
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h1 
            className="mb-4"
            style={{
              fontSize: '3.5rem',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '1.5rem'
            }}
          >
            FDSD Services
          </h1>
          <p 
            className="lead mb-5"
            style={{
              fontSize: '1.25rem',
              color: '#64748b',
              lineHeight: 1.6,
              marginBottom: '3rem'
            }}
          >
            Select a category below to continue
          </p>
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate('/services')}
            style={{
              padding: '0.875rem 2rem',
              fontSize: '1.125rem',
              fontWeight: 600,
              borderRadius: '10px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
              transition: 'all 0.2s ease-in-out'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)';
            }}
          >
            View Available Services
          </Button>
        </div>
      </div>
    </Layout>
  );
}
