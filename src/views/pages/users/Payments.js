import React, { useState } from 'react'
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

  const payments = [
    {
      clientName: 'Santiago',
      paymentId: '001',
      referenceNumber: 'REF001',
      amount: 120,
      date: '2024-11-14',
    },
  ]

  const filteredPayments = payments.filter((payment) => {
    return (
      payment.clientName.toLowerCase().includes(filterClient.toLowerCase()) &&
      payment.referenceNumber.includes(filterReference)
    )
  })

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
              <CTableHeaderCell>Client Name</CTableHeaderCell>
              <CTableHeaderCell>Payment ID</CTableHeaderCell>
              <CTableHeaderCell>Reference Number</CTableHeaderCell>
              <CTableHeaderCell>Amount</CTableHeaderCell>
              <CTableHeaderCell>Date</CTableHeaderCell>
              <CTableHeaderCell>Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {filteredPayments.map((payment, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{payment.clientName}</CTableDataCell>
                <CTableDataCell>{payment.paymentId}</CTableDataCell>
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
            <CFormInput placeholder="Client Name" className="mb-3" />
            <CFormInput placeholder="Payment ID" className="mb-3" />
            <CFormInput placeholder="Reference Number" className="mb-3" />
            <CFormInput placeholder="Amount" type="number" className="mb-3" />
            <CFormInput placeholder="Date" type="date" className="mb-3" />
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleAdd(false)}>
              Cancel
            </CButton>
            <CButton color="info" onClick={() => setVisibleAdd(false)}>
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
              placeholder="Client Name"
              defaultValue={selectedPayment?.clientName}
              className="mb-3"
            />
            <CFormInput
              placeholder="Payment ID"
              defaultValue={selectedPayment?.paymentId}
              className="mb-3"
            />
            <CFormInput
              placeholder="Reference Number"
              defaultValue={selectedPayment?.referenceNumber}
              className="mb-3"
            />
            <CFormInput
              placeholder="Amount"
              type="number"
              defaultValue={selectedPayment?.amount}
              className="mb-3"
            />
            <CFormInput
              placeholder="Date"
              type="date"
              defaultValue={selectedPayment?.date}
              className="mb-3"
            />
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleEdit(false)}>
              Cancel
            </CButton>
            <CButton color="info" onClick={() => setVisibleEdit(false)}>
              Save
            </CButton>
          </CModalFooter>
        </CModal>

        <CModal visible={visibleDelete} onClose={() => setVisibleDelete(false)}>
          <CModalHeader>
            <CModalTitle>Delete Payment</CModalTitle>
          </CModalHeader>
          <CModalBody>
            Are you sure you want to delete the payment made by {selectedPayment?.clientName}?
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleDelete(false)}>
              Cancel
            </CButton>
            <CButton color="danger" onClick={() => setVisibleDelete(false)}>
              Delete
            </CButton>
          </CModalFooter>
        </CModal>
      </CCardBody>
    </CCard>
  )
}

export default Payments
