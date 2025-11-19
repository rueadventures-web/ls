import { useState } from 'react';
import { Form, Button, Toast, ToastContainer } from 'react-bootstrap';
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
      <h1 className="mb-4">New Affidavit Request</h1>
      <Form onSubmit={handleSubmit}>
        <div className="mb-4">
          <h3 className="mb-3">Participant Info</h3>
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
        </div>

        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3>Check Information</h3>
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

        <div className="d-flex gap-3">
          <Button
            variant="secondary"
            onClick={handleSaveDraft}
            disabled={saveDraftMutation.isPending}
          >
            {saveDraftMutation.isPending ? 'Saving...' : 'Save Draft'}
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={submitMutation.isPending}
          >
            {submitMutation.isPending ? 'Submitting...' : 'Submit Request'}
          </Button>
        </div>
      </Form>

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

