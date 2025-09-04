import React, { useState, useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import generatePdf from '../../generatePdf.jsx';
import './BudgetForm.css';

const BudgetForm = () => {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');

  const [companyName, setCompanyName] = useState('HERYTEC PEST CONTROL LTDA.');
  const [companyCnpj, setCompanyCnpj] = useState('59.890.849/0001-20');
  const [companyAddress, setCompanyAddress] = useState('RUA. AVOANTE, 62 BRASILÂNDIA – SP.');
  const [companyContact, setCompanyContact] = useState('FONES: (11) 94383-6492 – (11) 98094-4452');

  const [proposalSubject, setProposalSubject] = useState('PROPOSTA PRÉVIA DE SERVIÇOS');
  const [servicesIncluded, setServicesIncluded] = useState('Dedetização completa das áreas do CEI ALECRIM DOURADO\nAplicação de produto domissanitário regularizado pela ANVISA\nUtilização de equipamentos e EPIs adequados para garantir segurança e eficácia\nRelatório técnico de execução do serviço, quando solicitado');
  const [investment, setInvestment] = useState('R$ 1.000,00 (Hum mil reais)');
  const [executionTime, setExecutionTime] = useState('Imediato, conforme disponibilidade do cliente');
  const [warranty, setWarranty] = useState('06 (seis) meses contra infestações nas áreas tratadas, desde que seguidas as orientações de prevenção e higiene.');
  const [postTreatmentGuidelines, setPostTreatmentGuidelines] = useState('Manter alimentos armazenados em recipientes fechados\nEvitar acúmulo de lixo ou restos de comida em áreas comuns\nManter os ambientes sempre limpos e secos\nRealizar vistorias periódicas em locais de difícil acesso (rodapés, atrás de móveis, etc.)\nSolicitar manutenção preventiva a cada 6 meses');
  const [responsibleName, setResponsibleName] = useState('Herywerton Batista');
  const [responsibleCrq, setResponsibleCrq] = useState('044115757251');
  const [responsibleContact, setResponsibleContact] = useState('(11) 94383-6492 / (11) 98094-4452');
  const [responsibleEmail, setResponsibleEmail] = useState('herywerton@gmail.com');

  const [logo, setLogo] = useState(null);

// ... existing code ...
  const sigCanvas = useRef({});

  const handlePreviewAndSave = () => {
    // const lastBudgetNumber = localStorage.getItem('lastBudgetNumber') || 0;
    // const newBudgetNumber = parseInt(lastBudgetNumber) + 1;

    const budgetData = {
      // number: newBudgetNumber,
      clientName: customerName,
      clientEmail: customerEmail,
      clientContact: customerPhone,
      clientAddress: customerAddress,
      companyName,
      companyCnpj,
      companyAddress,
      companyContact,
      logo,
      proposalSubject,
      servicesIncluded,
      investment,
      executionTime,
      warranty,
      postTreatmentGuidelines,
      responsibleName,
      responsibleCrq,
      responsibleContact,
      responsibleEmail,
    };

    // const existingBudgets = JSON.parse(localStorage.getItem('budgets')) || [];
    // localStorage.setItem('budgets', JSON.stringify([...existingBudgets, budgetData]));
    // localStorage.setItem('lastBudgetNumber', newBudgetNumber);

    console.log('Gerando PDF com os seguintes dados:', budgetData);
    generatePdf(budgetData);
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form>
      <h2>Informações da Empresa</h2>
      <div className="input-group">
        <h2>Nome da Empresa</h2>
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <h2>CNPJ</h2>
        <input
          type="text"
          value={companyCnpj}
          onChange={(e) => setCompanyCnpj(e.target.value)}
        />
        <h2>Endereço da Empresa</h2>
        <input
          type="text"
          value={companyAddress}
          onChange={(e) => setCompanyAddress(e.target.value)}
        />
        <h2>Contato da Empresa</h2>
        <input
          type="text"
          value={companyContact}
          onChange={(e) => setCompanyContact(e.target.value)}
        />
      </div>

      <h2>Informações do Cliente</h2>
      <div className="input-group">
        <h2>Nome do Cliente</h2>
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
        <h2>Email do Cliente</h2>
        <input
          type="email"
          value={customerEmail}
          onChange={(e) => setCustomerEmail(e.target.value)}
        />
        <h2>Telefone do Cliente</h2>
        <input
          type="tel"
          value={customerPhone}
          onChange={(e) => setCustomerPhone(e.target.value)}
        />
        <h2>Endereço do Cliente</h2>
        <input
          type="text"
          value={customerAddress}
          onChange={(e) => setCustomerAddress(e.target.value)}
        />
      </div>
      <h2>Logo da Empresa</h2>
      <input type="file" accept="image/*" onChange={handleLogoUpload} />
      {logo && <img src={logo} alt="Logo Preview" style={{ width: 120, marginBottom: 10 }} />}

      <h2>Detalhes da Proposta</h2>
      <div className="input-group">
        <h2>Assunto</h2>
        <input type="text" value={proposalSubject} onChange={(e) => setProposalSubject(e.target.value)} />
        <h2>Serviços Incluídos</h2>
        <textarea value={servicesIncluded} onChange={(e) => setServicesIncluded(e.target.value)} />
        <h2>Investimento</h2>
        <input type="text" value={investment} onChange={(e) => setInvestment(e.target.value)} />
        <h2>Prazo de Execução</h2>
        <input type="text" value={executionTime} onChange={(e) => setExecutionTime(e.target.value)} />
        <h2>Garantia</h2>
        <input type="text" value={warranty} onChange={(e) => setWarranty(e.target.value)} />
        <h2>Orientações de Prevenção</h2>
        <textarea value={postTreatmentGuidelines} onChange={(e) => setPostTreatmentGuidelines(e.target.value)} />
      </div>
      
      <h2>Responsável Técnico</h2>
      <div className="input-group">
        <h2>Nome do Responsável</h2>
        <input type="text" value={responsibleName} onChange={(e) => setResponsibleName(e.target.value)} />
        <h2>CRQ</h2>
        <input type="text" value={responsibleCrq} onChange={(e) => setResponsibleCrq(e.target.value)} />
        <h2>Contato do Responsável</h2>
        <input type="text" value={responsibleContact} onChange={(e) => setResponsibleContact(e.target.value)} />
        <h2>Email do Responsável</h2>
        <input type="text" value={responsibleEmail} onChange={(e) => setResponsibleEmail(e.target.value)} />
      </div>

      <button type="button" onClick={handlePreviewAndSave}>Gerar Orçamento</button>


    </form>
  );
};

export default BudgetForm;
