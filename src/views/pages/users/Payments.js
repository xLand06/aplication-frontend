import React, { useState, useEffect } from 'react'
import {
  CCard,
  CButton,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
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
} from '@coreui/react'

export const Payments = () => {
  const [filterClient, setFilterClient] = useState('')
  const [filterReference, setFilterReference] = useState('')
  const [visibleAdd, setVisibleAdd] = useState(false)
  const [visibleEdit, setVisibleEdit] = useState(false)
  const [visibleDelete, setVisibleDelete] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState(null)
  const [payments, setPayments] = useState([])
  const [newPayment, setNewPayment] = useState({
    id: '',
    clientName: '',
    referenceNumber: '',
    amount: '',
    date: '',
  })

  const filteredPayments = payments.filter((payment) => {
    return (
      payment.clientName.toLowerCase().includes(filterClient.toLowerCase()) &&
      payment.referenceNumber.includes(filterReference)
    )
  })

  const handleAddPayment = async () => {
    setPayments([...payments, newPayment])
    try {
      await fetch('http://localhost:5000/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPayment),
      })
    } catch (error) {
      console.log('There was an error', error)
    }
    setNewPayment({
      id: '',
      clientName: '',
      referenceNumber: '',
      amount: '',
      date: '',
    })
    setVisibleAdd(false)
  }

  const handleEditPayment = async () => {
    setPayments(
      payments.map((payment) =>
        payment.id === selectedPayment.id ? { ...selectedPayment } : payment,
      ),
    )
    try {
      await fetch(`http://localhost:5000/payments/${selectedPayment?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedPayment),
      })
    } catch (error) {
      console.log('There was an error:', error)
    }
    setVisibleEdit(false)
  }

  const handleDeletePayment = async () => {
    setPayments(payments.filter((payment) => payment.id !== selectedPayment.id))
    setVisibleDelete(false)
    try {
      await fetch(`http://localhost:5000/payments/${selectedPayment.id}`, {
        method: 'DELETE',
      })
    } catch (error) {
      console.log('Error requested: ', error)
    }
  }

  const fetchPayments = async () => {
    try {
      const response = await fetch('http://localhost:5000/payments')
      const data = await response.json()
      setPayments(data)
    } catch (error) {
      console.error('Error fetching payments:', error)
    }
  }

  useEffect(() => {
    fetchPayments()
  }, [])

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
              <CTableHeaderCell>Client Name</CTableHeaderCell>
              <CTableHeaderCell>Reference Number</CTableHeaderCell>
              <CTableHeaderCell>Amount</CTableHeaderCell>
              <CTableHeaderCell>Date</CTableHeaderCell>
              <CTableHeaderCell>Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {filteredPayments.map((payment, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{payment.id}</CTableDataCell>
                <CTableDataCell>{payment.clientName}</CTableDataCell>
                <CTableDataCell>{payment.referenceNumber}</CTableDataCell>
                <CTableDataCell>${payment.amount}</CTableDataCell>
                <CTableDataCell>{payment.date}</CTableDataCell>
                <CTableDataCell>
                  <CButton
                    color="info"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedPayment(payment)
                      setVisibleEdit(true)
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
                      setSelectedPayment(payment)
                      setVisibleDelete(true)
                    }}
                  >
                    Delete
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>

        <CModal visible={visibleAdd} onClose={() => setVisibleAdd(false)}>
          <CModalHeader>
            <CModalTitle>Add Payment</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CFormInput
              placeholder="ID"
              value={newPayment.id}
              onChange={(e) => setNewPayment({ ...newPayment, id: e.target.value })}
              className="mb-3"
            />
            <CFormInput
              placeholder="Client Name"
              value={newPayment.clientName}
              onChange={(e) => setNewPayment({ ...newPayment, clientName: e.target.value })}
              className="mb-3"
            />
            <CFormInput
              placeholder="Reference Number"
              value={newPayment.referenceNumber}
              onChange={(e) => setNewPayment({ ...newPayment, referenceNumber: e.target.value })}
              className="mb-3"
            />
            <CFormInput
              placeholder="Amount"
              value={newPayment.amount}
              type="number"
              onChange={(e) => setNewPayment({ ...newPayment, amount: e.target.value })}
              className="mb-3"
            />
            <CFormInput
              placeholder="Date"
              type="date"
              value={newPayment.date}
              onChange={(e) => setNewPayment({ ...newPayment, date: e.target.value })}
              className="mb-3"
            />
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleAdd(false)}>
              Cancel
            </CButton>
            <CButton color="info" onClick={handleAddPayment}>
              Save
            </CButton>
          </CModalFooter>
        </CModal>

        <CModal visible={visibleEdit} onClose={() => setVisibleEdit(false)}>
          <CModalHeader>
            <CModalTitle>Edit Payment</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CFormInput
              placeholder="ID"
              value={selectedPayment?.id}
              onChange={(e) => setSelectedPayment({ ...selectedPayment, id: e.target.value })}
              className="mb-3"
            />
            <CFormInput
              placeholder="Client Name"
              value={selectedPayment?.clientName}
              onChange={(e) =>
                setSelectedPayment({ ...selectedPayment, clientName: e.target.value })
              }
              className="mb-3"
            />
            <CFormInput
              placeholder="Reference Number"
              value={selectedPayment?.referenceNumber}
              onChange={(e) =>
                setSelectedPayment({ ...selectedPayment, referenceNumber: e.target.value })
              }
              className="mb-3"
            />
            <CFormInput
              placeholder="Amount"
              value={selectedPayment?.amount}
              type="number"
              onChange={(e) => setSelectedPayment({ ...selectedPayment, amount: e.target.value })}
              className="mb-3"
            />
            <CFormInput
              placeholder="Date"
              value={selectedPayment?.date}
              type="date"
              onChange={(e) => setSelectedPayment({ ...selectedPayment, date: e.target.value })}
              className="mb-3"
            />
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleEdit(false)}>
              Cancel
            </CButton>
            <CButton color="info" onClick={handleEditPayment}>
              Save
            </CButton>
          </CModalFooter>
        </CModal>

        <CModal visible={visibleDelete} onClose={() => setVisibleDelete(false)}>
          <CModalHeader>
            <CModalTitle>Delete Payment</CModalTitle>
          </CModalHeader>
          <CModalBody>
            Are you sure you want to delete the payment with ID{' '}
            <strong>{selectedPayment?.id}</strong>?
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleDelete(false)}>
              Cancel
            </CButton>
            <CButton color="danger" onClick={handleDeletePayment}>
              Delete
            </CButton>
          </CModalFooter>
        </CModal>
      </CCardBody>
    </CCard>
  )
}

export default Payments
