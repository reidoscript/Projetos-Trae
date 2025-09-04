import { Document, Page, Text, View, StyleSheet, Image, Font, Svg, Path } from '@react-pdf/renderer';

Font.register({
  family: 'Roboto',
  fonts: [
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf',
    },
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf',
      fontWeight: 'bold',
    },
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-italic-webfont.ttf',
      fontStyle: 'italic',
    },
  ],
});

const PlaceholderLogoSvg = () => (
  <Svg viewBox="0 0 24 24" width="50" height="50">
    <Path
      fill="#CCCCCC"
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"
    />
    <Path fill="#999999" d="M12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
  </Svg>
);

const CertificatePreview = ({ certificate }) => {
  const {
    companyName, companyCnpj, companyAddress, companyPhone,
    clientCompany, clientAddress, serviceType, serviceArea,
    serviceDate, validityDate, pestTypes, applicator,
    products, medicalIndications, responsibleName,
    responsibleTitle, responsibleRegistration, logo
  } = certificate;

  const getSelectedPests = () => {
    return Object.entries(pestTypes)
      .filter(([_, selected]) => selected)
      .map(([pest, _]) => pest.charAt(0).toUpperCase() + pest.slice(1))
      .join(', ');
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          {logo ? (
            <Image src={logo} style={styles.logo} />
          ) : (
            <PlaceholderLogoSvg />
          )}
          <View style={styles.companyInfo}>
            <Text style={styles.companyName}>{companyName}</Text>
            <Text style={styles.companyDetails}>CNPJ – {companyCnpj}</Text>
            <Text style={styles.companyDetails}>{companyAddress}</Text>
            <Text style={styles.companyDetails}>{companyPhone}</Text>
          </View>
        </View>

        <Text style={styles.certificateTitle}>Tomador de serviço</Text>

        {/* Client Info Box */}
        <View style={styles.clientBox}>
          <Text style={styles.clientLabel}>Empresa: {clientCompany}</Text>
          <Text style={styles.clientLabel}>Endereço: {clientAddress}</Text>
          <Text style={styles.clientLabel}>Serviço: {serviceType}</Text>
          <Text style={styles.clientLabel}>Área: {serviceArea}</Text>
          <Text style={styles.clientLabel}>Data: {serviceDate}</Text>
          <Text style={styles.clientLabel}>Validade até: {validityDate}</Text>
        </View>

        {/* Pest Types */}
        <Text style={styles.sectionTitle}>PRAGAS ALVO</Text>
        <View style={styles.pestGrid}>
          {Object.entries(pestTypes).map(([pest, selected]) => (
            <View key={pest} style={styles.pestItem}>
              <Text style={styles.pestCheckbox}>{selected ? '(X)' : '( )'}</Text>
              <Text style={styles.pestName}>{pest.charAt(0).toUpperCase() + pest.slice(1)}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.applicatorText}>Aplicadores: {applicator}</Text>

        {/* Products Table */}
        <Text style={styles.sectionTitle}>PRODUTOS UTILIZADOS PARA A DEDETIZAÇÃO:</Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableCell, styles.headerCell, { width: '15%' }]}>NOME</Text>
            <Text style={[styles.tableCell, styles.headerCell, { width: '20%' }]}>Nº. DE REGISTRO MS</Text>
            <Text style={[styles.tableCell, styles.headerCell, { width: '20%' }]}>COMPOSIÇÃO QUÍMICA OU ASSOCIAÇÃO</Text>
            <Text style={[styles.tableCell, styles.headerCell, { width: '25%' }]}>CONCENTRAÇÃO DE USO E VEÍCULO</Text>
            <Text style={[styles.tableCell, styles.headerCell, { width: '20%' }]}>QUANTIDADE APLICADA</Text>
          </View>
          {products.map((product, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableCell, { width: '15%' }]}>{product.name}</Text>
              <Text style={[styles.tableCell, { width: '20%' }]}>{product.registration}</Text>
              <Text style={[styles.tableCell, { width: '20%' }]}>{product.composition}</Text>
              <Text style={[styles.tableCell, { width: '25%' }]}>{product.concentration}</Text>
              <Text style={[styles.tableCell, { width: '20%' }]}>{product.quantity}</Text>
            </View>
          ))}
        </View>

        {/* Medical Indications Table */}
        <Text style={styles.sectionTitle}>INDICAÇÕES PARA USO MÉDICO:</Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableCell, styles.headerCell, { width: '25%' }]}>NOME</Text>
            <Text style={[styles.tableCell, styles.headerCell, { width: '25%' }]}>GRUPO QUÍMICO</Text>
            <Text style={[styles.tableCell, styles.headerCell, { width: '25%' }]}>AÇÃO TÓXICA</Text>
            <Text style={[styles.tableCell, styles.headerCell, { width: '25%' }]}>ANTÍDOTO E TRATAMENTO ADEQUADO</Text>
          </View>
          {medicalIndications.map((indication, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableCell, { width: '25%' }]}>{indication.name}</Text>
              <Text style={[styles.tableCell, { width: '25%' }]}>{indication.chemicalGroup}</Text>
              <Text style={[styles.tableCell, { width: '25%' }]}>{indication.toxicAction}</Text>
              <Text style={[styles.tableCell, { width: '25%' }]}>{indication.antidote}</Text>
            </View>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.responsibleSection}>
            <Text style={styles.responsibleTitle}>NOME DO RESPONSÁVEL TÉCNICO</Text>
            <Text style={styles.responsibleTitle}>Nº DE INSCRIÇÃO NO CONSELHO REGIONAL CORRESPONDENTE</Text>
          </View>
          <View style={styles.responsibleInfo}>
            <Text style={styles.responsibleName}>{responsibleName}</Text>
            <Text style={styles.responsibleRegistration}>{responsibleRegistration}</Text>
          </View>
          <View style={styles.responsibleInfo}>
            <Text style={styles.responsibleTitle2}>{responsibleTitle}</Text>
          </View>
        </View>

        <Text style={styles.disclaimer}>
          *Caso haja alguma ingestão ou absorção acidental procure um médico levando consigo esse certificado.
        </Text>
        <Text style={styles.phone}>0800-771-3737 OU (11) 5012-5311</Text>
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 15,
    fontFamily: 'Roboto',
    backgroundColor: '#FFFFFF',
    color: '#333',
    fontSize: 8
  },
  header: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 5,
  },
  logo: {
    width: 60,
    height: 60,
    marginRight: 15,
    objectFit: 'contain',
  },
  companyInfo: {
    flexDirection: 'column',
    flex: 1,
  },
  companyName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 2,
    textAlign: 'center'
  },
  companyDetails: {
    fontSize: 8,
    marginBottom: 1,
    textAlign: 'center'
  },
  certificateTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  clientBox: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 8,
    marginBottom: 8,
  },
  clientLabel: {
    fontSize: 8,
    marginBottom: 2,
  },
  sectionTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 8,
  },
  pestGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  pestItem: {
    flexDirection: 'row',
    width: '16.66%',
    marginBottom: 2,
  },
  pestCheckbox: {
    fontSize: 8,
    marginRight: 2,
  },
  pestName: {
    fontSize: 8,
  },
  applicatorText: {
    fontSize: 8,
    marginBottom: 8,
  },
  table: {
    marginBottom: 8,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#666',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  tableCell: {
    padding: 3,
    fontSize: 7,
    borderRightWidth: 0.5,
    borderRightColor: '#ccc',
    textAlign: 'center',
  },
  headerCell: {
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#666',
  },
  footer: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#000',
    paddingTop: 5,
  },
  responsibleSection: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  responsibleInfo: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  responsibleTitle: {
    fontSize: 8,
    fontWeight: 'bold',
    width: '50%',
    textAlign: 'center',
    backgroundColor: '#666',
    color: '#fff',
    padding: 2,
  },
  responsibleTitle2: {
    fontSize: 8,
    textAlign: 'center',
    width: '100%',
  },
  responsibleName: {
    fontSize: 8,
    width: '50%',
    textAlign: 'center',
    padding: 2,
  },
  responsibleRegistration: {
    fontSize: 8,
    width: '50%',
    textAlign: 'center',
    padding: 2,
  },
  disclaimer: {
    fontSize: 7,
    textAlign: 'center',
    marginTop: 8,
  },
  phone: {
    fontSize: 8,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 2,
  },
});

export default CertificatePreview;