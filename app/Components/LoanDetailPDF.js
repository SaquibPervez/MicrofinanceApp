import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 30,
    borderBottomWidth: 2,
    borderBottomColor: '#112131',
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#112131',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    textAlign: 'center',
    color: '#666',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#112131',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 5,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    width: '40%',
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    width: '60%',
    fontSize: 12,
    color: '#444',
  },
  status: (status) => ({
    fontSize: 12,
    fontWeight: 'bold',
    color: status === 'approved' ? '#28a745' : 
          status === 'rejected' ? '#dc3545' : '#ffc107',
    textTransform: 'uppercase',
  }),
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 10,
    color: '#666',
  },
})

const LoanDetailPDF = ({ loan }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>LOAN APPLICATION DETAILS</Text>
        <Text style={styles.subtitle}>LoanEase Financial Services</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Loan Information</Text>
        
        {[
          ['Category', loan.category],
          ['Subcategory', loan.subcategory],
          ['Loan Amount', `Rs. ${loan.loanAmount?.toLocaleString('en-IN') || '0'}`],
          ['Initial Deposit', `Rs. ${loan.initialDeposit?.toLocaleString('en-IN') || '0'}`],
          ['Monthly Payment', `Rs. ${loan.monthlyPayment?.toLocaleString('en-IN') || '0'}`],
          ['Loan Period', loan.loanPeriod],
        ].map(([label, value], idx) => (
          <View style={styles.row} key={`info-${idx}`}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Application Details</Text>
        
        <View style={styles.row}>
          <Text style={styles.label}>Token Number</Text>
          <Text style={styles.value}>{loan.tokenNumber || 'N/A'}</Text>
        </View>
        
        <View style={styles.row}>
          <Text style={styles.label}>Status</Text>
          <Text style={styles.status(loan.status)}>{loan.status.toUpperCase()}</Text>
        </View>
        
        <View style={styles.row}>
          <Text style={styles.label}>Application Date</Text>
          <Text style={styles.value}>
            {loan.createdAt ? new Date(loan.createdAt).toLocaleDateString() : 'N/A'}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Appointment Details</Text>
        
        {[
          ['Date', loan.appointmentDetails?.date ? new Date(loan.appointmentDetails.date).toLocaleDateString() : 'Not scheduled'],
          ['Time', loan.appointmentDetails?.time || 'Not scheduled'],
          ['Location', loan.appointmentDetails?.officeLocation || 'Not scheduled'],
        ].map(([label, value], idx) => (
          <View style={styles.row} key={`appointment-${idx}`}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
          </View>
        ))}
      </View>
       
      <Text style={styles.footer}>
        This document is system generated and does not require signature
      </Text>
    </Page>
  </Document>
)

export default LoanDetailPDF