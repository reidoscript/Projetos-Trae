import React from 'react';
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

const BudgetPreview = ({ budget }) => {
  const { 
    companyName, companyCnpj, companyAddress, companyContact,
    clientName, clientAddress, clientContact,
    proposalSubject, servicesIncluded, investment, executionTime, warranty, postTreatmentGuidelines,
    responsibleName, responsibleCrq, responsibleContact, responsibleEmail,
    logo
  } = budget;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          {logo ? (
            <Image src={logo} style={styles.logo} />
          ) : (
            <PlaceholderLogoSvg />
          )}
          <View style={styles.companyInfo}>
            <Text style={styles.companyName}>{companyName}</Text>
            <Text style={styles.companyDetails}>CNPJ: {companyCnpj}</Text>
            <Text style={styles.companyDetails}>{companyAddress}</Text>
            <Text style={styles.companyDetails}>{companyContact}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>PROPOSTA DE ORÇAMENTO</Text>
          <Text style={styles.date}>Data: {new Date().toLocaleDateString()}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Prezado(a) Cliente:</Text>
          <Text style={styles.text}>Nome: {clientName}</Text>
          <Text style={styles.text}>Endereço: {clientAddress}</Text>
          <Text style={styles.text}>Contato: {clientContact}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Assunto:</Text>
          <Text style={styles.text}>{proposalSubject}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Serviços Incluídos:</Text>
          <Text style={styles.text}>{servicesIncluded}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Investimento:</Text>
          <Text style={styles.text}>{investment}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Prazo de Execução:</Text>
          <Text style={styles.text}>{executionTime}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Garantia:</Text>
          <Text style={styles.text}>{warranty}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Orientações Pós-Tratamento:</Text>
          <Text style={styles.text}>{postTreatmentGuidelines}</Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.responsibleTitle}>Responsável Técnico:</Text>
          <Text style={styles.responsibleDetails}>{responsibleName}</Text>
          <Text style={styles.responsibleDetails}>CRQ: {responsibleCrq}</Text>
          <Text style={styles.responsibleDetails}>Contato: {responsibleContact}</Text>
          <Text style={styles.responsibleDetails}>Email: {responsibleEmail}</Text>
        </View>
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  page: { flexDirection: 'column', padding: 20, fontFamily: 'Roboto', backgroundColor: '#FFFFFF', color: '#333' },
  header: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    paddingBottom: 10,
  },
  logo: {
    width: 70,
    height: 70,
    marginRight: 20,
    objectFit: 'contain',
  },
  companyInfo: {
    flexDirection: 'column',
  },
  companyName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  companyDetails: {
    fontSize: 9,
    marginBottom: 1,
  },
  section: {
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#0056b3',
  },
  date: {
    fontSize: 10,
    textAlign: 'right',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 3,
    color: '#0056b3',
  },
  text: {
    fontSize: 9,
    marginBottom: 2,
    lineHeight: 1.3,
  },
  footer: {
    marginTop: 30,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    paddingTop: 10,
    textAlign: 'center',
  },
  responsibleTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  responsibleDetails: {
    fontSize: 9,
    marginBottom: 1,
  }
});

export default BudgetPreview;