import { pdf } from '@react-pdf/renderer';
import BudgetPreview from './src/components/BudgetPreview';

const generatePdf = async (budget) => {
  const blob = await pdf(<BudgetPreview budget={budget} />).toBlob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `orcamento-${budget.customerName.replace(/\s+/g, '_')}.pdf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export default generatePdf;