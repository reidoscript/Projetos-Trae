import React, { useState } from 'react';
import generatePdf from '../../generatePdf.jsx';
import './CertificateForm.css';

const CertificateForm = () => {
  const [companyName, setCompanyName] = useState('PLANET CLEAN DEDETIZADORA ME');
  const [companyCnpj, setCompanyCnpj] = useState('27.633.073/0001-77 CCM - 5.701.400-0');
  const [companyAddress, setCompanyAddress] = useState('RUA. AVOANTE, 62 VILA BRASILÂNDIA - SP');
  const [companyPhone, setCompanyPhone] = useState('FONES: (11) 98094-4452 – (11) 94383-4492');
  
  const [clientCompany, setClientCompany] = useState('CEI PLENITUDE');
  const [clientAddress, setClientAddress] = useState('Rua Eduardo Vieira de Melo, 85 – Jardim Eliza Maria - CEP: 02873-550 – SÃO PAULO - SP.');
  const [serviceType, setServiceType] = useState('DEDETIZAÇÃO E DESRATIZAÇÃO.');
  const [serviceArea, setServiceArea] = useState('Interna e Externa do CEI.');
  const [serviceDate, setServiceDate] = useState('26/07/2024');
  const [validityDate, setValidityDate] = useState('26/01/2025');
  
  const [pestTypes, setPestTypes] = useState({
    barata: true,
    rato: true,
    ratolzana: true,
    camundongo: true,
    cupim: false,
    mosca: false,
    carrapato: false,
    percevejo: false,
    formiga: false,
    lagarta: false,
    aranha: false
  });
  
  const [applicator, setApplicator] = useState('Herywerton');
  
  const [products, setProducts] = useState([
    {
      name: 'DDVP',
      registration: '3.1704.0020.001-9',
      composition: 'Diclorvós',
      concentration: '80 a 100 ml – 10 l.',
      quantity: '100 ml.'
    },
    {
      name: 'Alfacipermetrina',
      registration: '3.1834.0016.001-9',
      composition: 'Alfacipermetrina',
      concentration: '80 a 100 ml – 10 l.',
      quantity: '100 ml.'
    },
    {
      name: 'Ri-Do-Rato',
      registration: '3.0425.0041.001-3',
      composition: 'Brodifacoum',
      concentration: 'Dose única',
      quantity: ''
    }
  ]);
  
  const [medicalIndications, setMedicalIndications] = useState([
    {
      name: 'DDVP',
      chemicalGroup: 'Organofosforado',
      toxicAction: 'Inibição de colinesterases',
      antidote: 'Atropina, oximas e tratamen'
    },
    {
      name: 'Alfacipermetrina',
      chemicalGroup: 'Piretróide',
      toxicAction: 'Hipersensibilidade, irritante das mucosas',
      antidote: 'Anti-histamínico e tratamento sintomático'
    },
    {
      name: 'Ri-Do-Rato',
      chemicalGroup: 'Cumarínico',
      toxicAction: 'Hemorragia e Fragilidade capilar',
      antidote: 'Vitamina K1 e tratamento sintomático'
    }
  ]);
  
  const [responsibleName, setResponsibleName] = useState('Herywerton Batista da Silva');
  const [responsibleTitle, setResponsibleTitle] = useState('(Químico)');
  const [responsibleRegistration, setResponsibleRegistration] = useState('CRQVSP 04115725');
  
  const [logo, setLogo] = useState(null);

  const handleGenerateCertificate = () => {
    const certificateData = {
      type: 'certificate',
      companyName,
      companyCnpj,
      companyAddress,
      companyPhone,
      clientCompany,
      clientAddress,
      serviceType,
      serviceArea,
      serviceDate,
      validityDate,
      pestTypes,
      applicator,
      products,
      medicalIndications,
      responsibleName,
      responsibleTitle,
      responsibleRegistration,
      logo
    };

    console.log('Gerando Certificado PDF com os seguintes dados:', certificateData);
    generatePdf(certificateData);
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

  const handlePestTypeChange = (pestType) => {
    setPestTypes(prev => ({
      ...prev,
      [pestType]: !prev[pestType]
    }));
  };

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
    setProducts(updatedProducts);
  };

  const addProduct = () => {
    setProducts([...products, {
      name: '',
      registration: '',
      composition: '',
      concentration: '',
      quantity: ''
    }]);
  };

  const removeProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  const handleMedicalIndicationChange = (index, field, value) => {
    const updatedIndications = [...medicalIndications];
    updatedIndications[index][field] = value;
    setMedicalIndications(updatedIndications);
  };

  const addMedicalIndication = () => {
    setMedicalIndications([...medicalIndications, {
      name: '',
      chemicalGroup: '',
      toxicAction: '',
      antidote: ''
    }]);
  };

  const removeMedicalIndication = (index) => {
    const updatedIndications = medicalIndications.filter((_, i) => i !== index);
    setMedicalIndications(updatedIndications);
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
        <h2>Telefones</h2>
        <input
          type="text"
          value={companyPhone}
          onChange={(e) => setCompanyPhone(e.target.value)}
        />
      </div>

      <h2>Logo da Empresa</h2>
      <input type="file" accept="image/*" onChange={handleLogoUpload} />
      {logo && <img src={logo} alt="Logo Preview" style={{ width: 120, marginBottom: 10 }} />}

      <h2>Informações do Cliente</h2>
      <div className="input-group">
        <h2>Empresa Cliente</h2>
        <input
          type="text"
          value={clientCompany}
          onChange={(e) => setClientCompany(e.target.value)}
        />
        <h2>Endereço do Cliente</h2>
        <input
          type="text"
          value={clientAddress}
          onChange={(e) => setClientAddress(e.target.value)}
        />
      </div>

      <h2>Detalhes do Serviço</h2>
      <div className="input-group">
        <h2>Tipo de Serviço</h2>
        <input
          type="text"
          value={serviceType}
          onChange={(e) => setServiceType(e.target.value)}
        />
        <h2>Área do Serviço</h2>
        <input
          type="text"
          value={serviceArea}
          onChange={(e) => setServiceArea(e.target.value)}
        />
        <h2>Data do Serviço</h2>
        <input
          type="date"
          value={serviceDate}
          onChange={(e) => setServiceDate(e.target.value)}
        />
        <h2>Validade</h2>
        <input
          type="date"
          value={validityDate}
          onChange={(e) => setValidityDate(e.target.value)}
        />
        <h2>Aplicador</h2>
        <input
          type="text"
          value={applicator}
          onChange={(e) => setApplicator(e.target.value)}
        />
      </div>

      <h2>Pragas Alvo</h2>
      <div className="pest-types">
        {Object.entries(pestTypes).map(([pest, checked]) => (
          <label key={pest} style={{ marginRight: '15px', display: 'inline-block' }}>
            <input
              type="checkbox"
              checked={checked}
              onChange={() => handlePestTypeChange(pest)}
              style={{ marginRight: '5px' }}
            />
            {pest.charAt(0).toUpperCase() + pest.slice(1)}
          </label>
        ))}
      </div>

      <h2>Produtos Utilizados para a Dedetização</h2>
      <div className="products-section">
        {products.map((product, index) => (
          <div key={index} className="product-item">
            <h3>Produto {index + 1}</h3>
            <div className="input-group">
              <label>Nome:</label>
              <input
                type="text"
                value={product.name}
                onChange={(e) => handleProductChange(index, 'name', e.target.value)}
              />
              <label>Nº de Registro MS:</label>
              <input
                type="text"
                value={product.registration}
                onChange={(e) => handleProductChange(index, 'registration', e.target.value)}
              />
              <label>Composição Química:</label>
              <input
                type="text"
                value={product.composition}
                onChange={(e) => handleProductChange(index, 'composition', e.target.value)}
              />
              <label>Concentração de Uso:</label>
              <input
                type="text"
                value={product.concentration}
                onChange={(e) => handleProductChange(index, 'concentration', e.target.value)}
              />
              <label>Quantidade Aplicada:</label>
              <input
                type="text"
                value={product.quantity}
                onChange={(e) => handleProductChange(index, 'quantity', e.target.value)}
              />
              <button type="button" onClick={() => removeProduct(index)} className="remove-btn">
                Remover Produto
              </button>
            </div>
          </div>
        ))}
        <button type="button" onClick={addProduct} className="add-btn">
          Adicionar Produto
        </button>
      </div>

      <h2>Indicações para Uso Médico</h2>
      <div className="medical-section">
        {medicalIndications.map((indication, index) => (
          <div key={index} className="medical-item">
            <h3>Indicação {index + 1}</h3>
            <div className="input-group">
              <label>Nome:</label>
              <input
                type="text"
                value={indication.name}
                onChange={(e) => handleMedicalIndicationChange(index, 'name', e.target.value)}
              />
              <label>Grupo Químico:</label>
              <input
                type="text"
                value={indication.chemicalGroup}
                onChange={(e) => handleMedicalIndicationChange(index, 'chemicalGroup', e.target.value)}
              />
              <label>Ação Tóxica:</label>
              <input
                type="text"
                value={indication.toxicAction}
                onChange={(e) => handleMedicalIndicationChange(index, 'toxicAction', e.target.value)}
              />
              <label>Antídoto e Tratamento:</label>
              <input
                type="text"
                value={indication.antidote}
                onChange={(e) => handleMedicalIndicationChange(index, 'antidote', e.target.value)}
              />
              <button type="button" onClick={() => removeMedicalIndication(index)} className="remove-btn">
                Remover Indicação
              </button>
            </div>
          </div>
        ))}
        <button type="button" onClick={addMedicalIndication} className="add-btn">
          Adicionar Indicação Médica
        </button>
      </div>

      <h2>Responsável Técnico</h2>
      <div className="input-group">
        <h2>Nome do Responsável</h2>
        <input
          type="text"
          value={responsibleName}
          onChange={(e) => setResponsibleName(e.target.value)}
        />
        <h2>Título</h2>
        <input
          type="text"
          value={responsibleTitle}
          onChange={(e) => setResponsibleTitle(e.target.value)}
        />
        <h2>Registro</h2>
        <input
          type="text"
          value={responsibleRegistration}
          onChange={(e) => setResponsibleRegistration(e.target.value)}
        />
      </div>

      <button type="button" onClick={handleGenerateCertificate}>
        Gerar Certificado
      </button>
    </form>
  );
};

export default CertificateForm;