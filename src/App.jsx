import './App.css';
import { useState } from 'react';
import BudgetForm from './components/BudgetForm';
import CertificateForm from './components/CertificateForm';

function App() {
  const [documentType, setDocumentType] = useState('budget');

  return (
    <div className="App">
      <header className="App-header">
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <h1>Gerador de Documentos</h1>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ marginRight: '10px' }}>
            <input
              type="radio"
              value="budget"
              checked={documentType === 'budget'}
              onChange={(e) => setDocumentType(e.target.value)}
              style={{ marginRight: '5px' }}
            />
            Orçamento
          </label>
          <label>
            <input
              type="radio"
              value="certificate"
              checked={documentType === 'certificate'}
              onChange={(e) => setDocumentType(e.target.value)}
              style={{ marginRight: '5px' }}
            />
            Certificado
          </label>
        </div>
      </header>
      <main>
        {documentType === 'budget' && <BudgetForm />}
        {documentType === 'certificate' && <CertificateForm />}
      </main>
    </div>
  );
}

export default App;
