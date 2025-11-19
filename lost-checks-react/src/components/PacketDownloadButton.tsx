import { Button } from 'react-bootstrap';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import type { PacketData } from '../api/useAffidavitPacketQuery';

interface PacketDownloadButtonProps {
  data: PacketData | null;
  disabled?: boolean;
}

export function PacketDownloadButton({ data, disabled }: PacketDownloadButtonProps) {
  const generatePDF = async () => {
    if (!data) return;

    try {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([612, 792]); // US Letter size
      const { width, height } = page.getSize();
      const margin = 50;
      let yPosition = height - margin;

      // Get fonts
      const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const helveticaBoldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

      // Title
      page.drawText('FDSD Services', {
        x: width / 2,
        y: yPosition,
        size: 20,
        font: helveticaBoldFont,
        color: rgb(0, 0, 0),
        rotate: { angleInRadians: 0 },
        opacity: 1,
      });
      yPosition -= 25;

      page.drawText('Lost Check Affidavit – Preview Packet', {
        x: width / 2,
        y: yPosition,
        size: 16,
        font: helveticaFont,
        color: rgb(0, 0, 0),
        rotate: { angleInRadians: 0 },
        opacity: 1,
      });
      yPosition -= 30;

      // Participant Information
      page.drawText('Participant Information', {
        x: margin,
        y: yPosition,
        size: 14,
        font: helveticaBoldFont,
        color: rgb(0, 0, 0),
      });
      yPosition -= 20;

      const participantInfo = [
        `Participant Name: ${data.participant_name}`,
        `Case Number: ${data.case_number}`,
        `Affidavit Reason: ${data.reason}`,
        `Date Reported: ${data.date_reported}`,
        `Submission Date: ${new Date().toLocaleDateString()}`,
      ];

      participantInfo.forEach((info) => {
        page.drawText(info, {
          x: margin,
          y: yPosition,
          size: 11,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
        yPosition -= 15;
      });

      yPosition -= 10;

      // Check Information
      page.drawText('Check Information', {
        x: margin,
        y: yPosition,
        size: 14,
        font: helveticaBoldFont,
        color: rgb(0, 0, 0),
      });
      yPosition -= 20;

      // Table header
      const tableStartY = yPosition;
      const colWidths = [120, 100, 100, 150];
      const headers = ['Check Number', 'Date', 'Amount', 'Bank'];
      let xPos = margin;

      headers.forEach((header, i) => {
        page.drawText(header, {
          x: xPos,
          y: yPosition,
          size: 10,
          font: helveticaBoldFont,
          color: rgb(0, 0, 0),
        });
        xPos += colWidths[i];
      });

      // Draw header line
      yPosition -= 5;
      page.drawLine({
        start: { x: margin, y: yPosition },
        end: { x: width - margin, y: yPosition },
        thickness: 1,
        color: rgb(0, 0, 0),
      });
      yPosition -= 15;

      // Table rows
      data.checks.forEach((check) => {
        xPos = margin;
        page.drawText(check.check_number, {
          x: xPos,
          y: yPosition,
          size: 10,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
        xPos += colWidths[0];
        page.drawText(check.date, {
          x: xPos,
          y: yPosition,
          size: 10,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
        xPos += colWidths[1];
        page.drawText(`$${check.amount}`, {
          x: xPos,
          y: yPosition,
          size: 10,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
        xPos += colWidths[2];
        page.drawText(check.bank, {
          x: xPos,
          y: yPosition,
          size: 10,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
        yPosition -= 15;
      });

      // Signature section
      yPosition -= 20;
      page.drawText('Participant Signature:', {
        x: margin,
        y: yPosition,
        size: 11,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
      yPosition -= 20;
      page.drawLine({
        start: { x: margin, y: yPosition },
        end: { x: margin + 200, y: yPosition },
        thickness: 1,
        color: rgb(0, 0, 0),
      });

      page.drawText('Date:', {
        x: margin + 250,
        y: yPosition + 20,
        size: 11,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
      page.drawLine({
        start: { x: margin + 290, y: yPosition },
        end: { x: margin + 390, y: yPosition },
        thickness: 1,
        color: rgb(0, 0, 0),
      });

      // Footer
      page.drawText(
        `Page 1 of 1`,
        {
          x: width / 2,
          y: 30,
          size: 8,
          font: helveticaFont,
          color: rgb(0.5, 0.5, 0.5),
        }
      );

      // Generate PDF bytes
      const pdfBytes = await pdfDoc.save();

      // Create blob and download
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `AffidavitPacket_${data.case_number}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  return (
    <Button
      variant="primary"
      size="lg"
      onClick={generatePDF}
      disabled={disabled || !data}
    >
      Download PDF
    </Button>
  );
}

