import { useState } from 'react';
import { Form, Button, Toast, ToastContainer, Card } from 'react-bootstrap';
import { Layout } from '../components/Layout';
import { CheckForm } from '../components/CheckForm';
import { SuccessModal } from '../components/SuccessModal';
import { useSaveDraft } from '../api/useSaveDraft';
import { useSubmitAffidavit } from '../api/useSubmitAffidavit';
import type { AffidavitFormData, Check } from '../api/types';

const initialCheck: Check = {
  checkNumber: '',
  checkAmount: '',
  checkDate: '',
  bankName: '',
  notes: '',
};

export function AffidavitFormPage() {
  const [formData, setFormData] = useState<AffidavitFormData>({
    participantName: '',
    caseNumber: '',
    affidavitReason: 'Lost',
    dateReported: '',
    checks: [{ ...initialCheck }],
    docusignRequested: false,
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const saveDraftMutation = useSaveDraft();
  const submitMutation = useSubmitAffidavit();

  const handleCheckChange = (index: number, field: keyof Check, value: string) => {
    const newChecks = [...formData.checks];
    newChecks[index] = { ...newChecks[index], [field]: value };
    setFormData({ ...formData, checks: newChecks });
  };

  const handleAddCheck = () => {
    if (formData.checks.length < 3) {
      setFormData({
        ...formData,
        checks: [...formData.checks, { ...initialCheck }],
      });
    }
  };

  const handleRemoveCheck = (index: number) => {
    if (formData.checks.length > 1) {
      const newChecks = formData.checks.filter((_, i) => i !== index);
      setFormData({ ...formData, checks: newChecks });
    }
  };

  const handleSaveDraft = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await saveDraftMutation.mutateAsync(formData);
      setShowToast(true);
    } catch (error) {
      console.error('Failed to save draft:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitMutation.mutateAsync(formData);
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Failed to submit:', error);
    }
  };

  return (
    <Layout>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 
          className="mb-4"
          style={{
            fontSize: '2.5rem',
            fontWeight: 700,
            color: '#1e293b',
            marginBottom: '2rem'
          }}
        >
          New Affidavit Request
        </h1>
        <Card className="shadow-sm mb-4" style={{ border: 'none', borderRadius: '12px' }}>
          <Card.Body style={{ padding: '2rem' }}>
            <Form onSubmit={handleSubmit}>
              <div className="mb-4">
                <h3 
                  className="mb-4"
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    color: '#1e293b',
                    paddingBottom: '1rem',
                    borderBottom: '2px solid #e2e8f0'
                  }}
                >
                  Participant Info
                </h3>
          <Form.Group className="mb-3">
            <Form.Label>Participant Name</Form.Label>
            <Form.Control
              type="text"
              value={formData.participantName}
              onChange={(e) =>
                setFormData({ ...formData, participantName: e.target.value })
              }
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Case Number</Form.Label>
            <Form.Control
              type="text"
              value={formData.caseNumber}
              onChange={(e) =>
                setFormData({ ...formData, caseNumber: e.target.value })
              }
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Affidavit Reason</Form.Label>
            <Form.Select
              value={formData.affidavitReason}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  affidavitReason: e.target.value as AffidavitFormData['affidavitReason'],
                })
              }
              required
            >
              <option value="Lost">Lost</option>
              <option value="Stolen">Stolen</option>
              <option value="Damaged">Damaged</option>
              <option value="Fraud">Fraud</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Date Reported</Form.Label>
            <Form.Control
              type="date"
              value={formData.dateReported}
              onChange={(e) =>
                setFormData({ ...formData, dateReported: e.target.value })
              }
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              id="docusign-requested"
              label="Docusign requested"
              checked={formData.docusignRequested}
              onChange={(e) =>
                setFormData({ ...formData, docusignRequested: e.target.checked })
              }
            />
          </Form.Group>
        </div>

              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h3
                    style={{
                      fontSize: '1.5rem',
                      fontWeight: 600,
                      color: '#1e293b',
                      paddingBottom: '1rem',
                      borderBottom: '2px solid #e2e8f0',
                      flex: 1,
                      marginRight: '1rem'
                    }}
                  >
                    Check Information
                  </h3>
            {formData.checks.length < 3 && (
              <Button variant="outline-primary" onClick={handleAddCheck}>
                Add Check
              </Button>
            )}
          </div>
          {formData.checks.map((check, index) => (
            <CheckForm
              key={index}
              check={check}
              index={index}
              onChange={handleCheckChange}
              onRemove={handleRemoveCheck}
              canRemove={formData.checks.length > 1}
            />
          ))}
        </div>

                <div className="d-flex gap-3 mt-4" style={{ paddingTop: '1.5rem', borderTop: '1px solid #e2e8f0' }}>
                  <Button
                    variant="secondary"
                    onClick={handleSaveDraft}
                    disabled={saveDraftMutation.isPending}
                    style={{
                      borderRadius: '8px',
                      fontWeight: 500,
                      padding: '0.75rem 2rem'
                    }}
                  >
                    {saveDraftMutation.isPending ? 'Saving...' : 'Save Draft'}
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={submitMutation.isPending}
                    style={{
                      borderRadius: '8px',
                      fontWeight: 500,
                      padding: '0.75rem 2rem'
                    }}
                  >
                    {submitMutation.isPending ? 'Submitting...' : 'Submit Request'}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>

      <SuccessModal
        show={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />

      <ToastContainer position="top-end" className="p-3">
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
          bg="success"
        >
          <Toast.Header>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            Draft saved successfully
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </Layout>
  );
}

