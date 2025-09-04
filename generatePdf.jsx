import { pdf } from '@react-pdf/renderer';
import BudgetPreview from './src/components/BudgetPreview';
import CertificatePreview from './src/components/CertificatePreview';

const generatePdf = async (data) => {
  let component;
  let filename;
  
  if (data.type === 'certificate') {
    component = <CertificatePreview certificate={data} />;
    filename = `certificado-${data.clientCompany.replace(/\s+/g, '_')}.pdf`;
  } else {
    component = <BudgetPreview budget={data} />;
    filename = `orcamento-${data.clientName.replace(/\s+/g, '_')}.pdf`;
  }
  
  const blob = await pdf(component).toBlob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export default generatePdf;