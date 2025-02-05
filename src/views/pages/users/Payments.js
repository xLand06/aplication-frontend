import React, { useState, useEffect } from 'react';
import {
  CCard,
  CButton,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormSelect,
  CRow,
  CTable,
  CTableDataCell,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react';
import { helpFetch } from '../../../Api/HelpFetch';

const api = helpFetch()
export const Payments = () => {
  const [filterClient, setFilterClient] = useState('');
  const [filterReference, setFilterReference] = useState('');
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [payments, setPayments] = useState([]);
  const [editedPayment, setEditedPayment] = useState (null)
  const [newPayment, setNewPayment] = useState({
    id: '',
    repairId: '',
    clientId: '',
    clientName: '',
    referenceNumber: '',
    paymentMethod: '',
    amount: '',
    date: '',
    descriptions: '',
  });

  const filteredPayments = payments.filter((payment) => {
    return (
      payment.clientName.toLowerCase().includes(filterClient.toLowerCase()) &&
      payment.referenceNumber.includes(filterReference)
    );
  });

  const addPayment = () => {
    api.post('payments', { body: newPayment }).then((response) => {
      if (!response.error) {
        setNewPayment({
          id: '',
          repairId: '',
          clientId: '',
         clientName: '',
         referenceNumber: '',
         paymentMethod: '',
          amount: '',
         date: '',
           descriptions: '',
        })
        fetchPayments()
      }
    })
  }
  const handleInputChange = (e) => {
    const { id, value } = e.target
    setNewPayment({
      ...newPayment,
      [id]: value,
})
}
  
  const editPayment = async (payment) => {
    const options = {
      body: payment
    }
    await api.put('payments',options,payment.id).then((data) => {
      if (!data.error){
        fetchPayments()
      }}
    )
  }

  
 const deletePayment = async (payment) => { 
  await api.delet ('payments',payment.id).then((response) => {
    if (!response.error){
      fetchPayments()
    }
  }
)
 }

  const fetchPayments = async () => {
    await api.get('payments').then ((data) => {
      if (!data.error && Array.isArray(data)){
        setPayments(data)
      } 
    })
  }   

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <h4 className="mb-0">Payments</h4>
      </CCardHeader>
      <CCardBody>
        <CForm className="mb-4">
          <CRow className="g-3">
            <CCol md={3}>
              <CFormInput
                type="text"
                placeholder="Filter by Client Name"
                value={filterClient}
                onChange={(e) => setFilterClient(e.target.value)}
              />
            </CCol>
            <CCol md={3}>
              <CFormInput
                type="text"
                placeholder="Filter by Reference Number"
                value={filterReference}
                onChange={(e) => setFilterReference(e.target.value)}
              />
            </CCol>
            <CCol md={3}>
              <CButton color="info" onClick={() => setVisibleAdd(true)}>
                Add Payment
              </CButton>
            </CCol>
          </CRow>
        </CForm>

        <CTable hover responsive className="mt-4">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>ID</CTableHeaderCell>
              <CTableHeaderCell>Repair ID</CTableHeaderCell>
              <CTableHeaderCell>Client ID</CTableHeaderCell>
              <CTableHeaderCell>Client Name</CTableHeaderCell>
              <CTableHeaderCell>Reference Number</CTableHeaderCell>
              <CTableHeaderCell>Payment Method</CTableHeaderCell>
              <CTableHeaderCell>Amount</CTableHeaderCell>
              <CTableHeaderCell>DateTime</CTableHeaderCell>
              <CTableHeaderCell>Descriptions</CTableHeaderCell>
              <CTableHeaderCell>Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {filteredPayments.map((payment, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{payment.id}</CTableDataCell>
                <CTableDataCell>{payment.repairId}</CTableDataCell>
                <CTableDataCell>{payment.clientId}</CTableDataCell>
                <CTableDataCell>{payment.clientName}</CTableDataCell>
                <CTableDataCell>{payment.referenceNumber}</CTableDataCell>
                <CTableDataCell>{payment.paymentMethod}</CTableDataCell>
                <CTableDataCell>${payment.amount}</CTableDataCell>
                <CTableDataCell>{payment.date}</CTableDataCell>
                <CTableDataCell>{payment.descriptions}</CTableDataCell>
                <CTableDataCell>
                  <CButton
                    color="info"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditedPayment(payment);
                      setVisibleEdit(true);
                    }}
                    className="me-2"
                  >
                    Edit
                  </CButton>
                  <CButton
                    color="danger"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedPayment(payment);
                      setVisibleDelete(true);
                    }}
                  >
                    Delete
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>

        {/* Modal para agregar pagos */}
        <CModal visible={visibleAdd} onClose={() => setVisibleAdd(false)}>
          <CModalHeader>
            <CModalTitle>Add Payment</CModalTitle>
          </CModalHeader>
          <CModalBody>
            {/* Formulario para agregar pagos */}
            <CRow>
              <CCol md={6}>
                <div className="mb-3">
                  <label htmlFor="addId" className="form-label">
                    ID
                  </label>
                  <CFormInput
                    id="id"
                    placeholder="ID"
                    value={newPayment.id}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="addRepairId" className="form-label">
                    Enter Repair ID
                  </label>
                  <CFormInput
                    id="repairId"
                    placeholder="Repair ID"
                    value={newPayment.repairId}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="addClientId" className="form-label">
                    Enter Client ID
                  </label>
                  <CFormInput
                    id="clientId"
                    placeholder="Client ID"
                    value={newPayment.clientId}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="ClientName" className="form-label">
                    Enter Client Name
                  </label>
                  <CFormInput
                    id="clientName"
                    placeholder="Client Name"
                    value={newPayment.clientName}
                    onChange={handleInputChange}
                  />
                </div>
              </CCol>
              <CCol md={6}>
                <div className="mb-3">
                  <label htmlFor="addReferenceNumber" className="form-label">
                    Enter Reference Number
                  </label>
                  <CFormInput
                    id="referenceNumber"
                    placeholder="Reference Number"
                    value={newPayment.referenceNumber}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="addPaymentMethod" className="form-label">
                    Payment Method
                  </label>
                  <CFormSelect
                    id="paymentMethod"
                    value={newPayment.paymentMethod}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Payment Method</option>
                    <option value="Cash">Cash</option>
                    <option value="Transfer">Transfer</option>
                    <option value="Mobile payment">Mobile Payment</option>
                  </CFormSelect>
                </div>
                <div className="mb-3">
                  <label htmlFor="addAmount" className="form-label">
                    Enter Amount
                  </label>
                  <CFormInput
                    id="amount"
                    placeholder="Amount"
                    value={newPayment.amount}
                    type="number"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="addDate" className="form-label">
                    Enter DateTime
                  </label>
                  <CFormInput
                    id="date"
                    placeholder="Date"
                    type="date"
                    value={newPayment.date}
                    onChange={handleInputChange}
                  />
                </div>
              </CCol>
              <CCol md={12}>
                <div className="mb-3">
                  <label htmlFor="addDescriptions" className="form-label">
                    Enter Descriptions
                  </label>
                  <CFormInput
                    id="descriptions"
                    placeholder="Descriptions or Observations"
                    value={newPayment.descriptions}
                    onChange={handleInputChange}
                  />
                </div>
              </CCol>
            </CRow>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleAdd(false)}>
              Cancel
            </CButton>
            <CButton color="info" onClick={() => {addPayment();setVisibleAdd(false)}}>
              Save
            </CButton>
          </CModalFooter>
        </CModal>

        
        <CModal visible={visibleEdit} onClose={() => setVisibleEdit(false)}>
          <CModalHeader>
            <CModalTitle>Edit Payment</CModalTitle>
          </CModalHeader>
          <CModalBody>
            {/* Formulario para editar pagos */}
            <CRow>
              <CCol md={6}>
                <div className="mb-3">
                  <label htmlFor="editId" className="form-label">
                    Enter ID
                  </label>
                  <CFormInput
                    id="id"
                    placeholder="ID"
                    value={editedPayment?.id}
                    onChange={(e) => setEditedPayment({ ...editedPayment, id: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="editRepairId" className="form-label">
                    Enter Repair ID
                  </label>
                  <CFormInput
                    id="repairId"
                    placeholder="Repair ID"
                    value={editedPayment?.repairId}
                    onChange={(e) => setEditedPayment({ ...editedPayment, repairId: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="editClientId" className="form-label">
                    Enter Client ID
                  </label>
                  <CFormInput
                    id="clientId"
                    placeholder="Client ID"
                    value={editedPayment?.clientId}
                    onChange={(e) => setEditedPayment({ ...editedPayment, clientId: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="editClientName" className="form-label">
                    Enter Client Name
                  </label>
                  <CFormInput
                    id="clientName"
                    placeholder="Client Name"
                    value={editedPayment?.clientName}
                    onChange={(e) => setEditedPayment({ ...editedPayment, clientName: e.target.value })}
                  />
                </div>
              </CCol>
              <CCol md={6}>
                <div className="mb-3">
                  <label htmlFor="editReferenceNumber" className="form-label">
                    Enter Reference Number
                  </label>
                  <CFormInput
                    id="referenceNumber"
                    placeholder="Reference Number"
                    value={editedPayment?.referenceNumber}
                    onChange={(e) => setEditedPayment({ ...editedPayment, referenceNumber: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="editPaymentMethod" className="form-label">
                    Payment Method
                  </label>
                  <CFormSelect
                    id="paymentMethod"
                    value={editedPayment?.paymentMethod}
                    onChange={(e) => setEditedPayment({ ...editedPayment, paymentMethod: e.target.value })}
                  >
                    <option value="">Select Payment Method</option>
                    <option value="Cash">Cash</option>
                    <option value="Transfer">Transfer</option>
                    <option value="Mobile payment">Mobile Payment</option>
                  </CFormSelect>
                </div>
                <div className="mb-3">
                  <label htmlFor="editAmount" className="form-label">
                    Enter Amount
                  </label>
                  <CFormInput
                    id="amount"
                    placeholder="Amount"
                    value={editedPayment?.amount}
                    type="number"
                    onChange={(e) => setEditedPayment({ ...editedPayment, amount: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="editDate" className="form-label">
                    Enter Datetime
                  </label>
                  <CFormInput
                    id="date"
                    placeholder="Date"
                    value={editedPayment?.date}
                    type="date"
                    onChange={(e) => setEditedPayment({ ...editedPayment, date: e.target.value })}
                  />
                </div>
              </CCol>
              <CCol md={12}>
                <div className="mb-3">
                  <label htmlFor="editDescriptions" className="form-label">
                    Descriptions
                  </label>
                  <CFormInput
                    id="editDescriptions"
                    placeholder="Descriptions or Observations"
                    value={editedPayment?.descriptions}
                    onChange={(e) => setEditedPayment({ ...editedPayment, descriptions: e.target.value })}
                  />
                </div>
              </CCol>
            </CRow>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleEdit(false)}>
              Cancel
            </CButton>
            <CButton color="info" onClick={() => {editPayment(editedPayment); setVisibleEdit(false)}}>
              Save
            </CButton>
          </CModalFooter>
        </CModal>

        <CModal visible={visibleDelete} onClose={() => setVisibleDelete(false)}>
          <CModalHeader>
            <CModalTitle>Delete Payment</CModalTitle>
          </CModalHeader>
          <CModalBody>

          {selectedPayment? (
              <p>
                Are you sure you want to delete the payment of {selectedPayment.clientName}{' '}
                ?
              </p>
            ) : (
              <p>No user selected.</p>
            )}
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleDelete(false)}>
              Cancel
            </CButton>
            <CButton color="danger" onClick={() => {deletePayment() ; setVisibleDelete(false)}}>
              Delete
            </CButton>
          </CModalFooter>
        </CModal>
      </CCardBody>
    </CCard>
  );
};

export default Payments;