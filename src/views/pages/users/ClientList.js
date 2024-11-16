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

export const ClientList = () => {
  const [filterName, setFilterName] = useState('')
  const [filterId, setFilterId] = useState('')
  const [visibleAdd, setVisibleAdd] = useState(false)
  const [visibleEdit, setVisibleEdit] = useState(false)
  const [visibleDelete, setVisibleDelete] = useState(false)
  const [selectedClient, setSelectedClient] = useState(null)

  const clients = [
    {
      firstName: 'Santiago',
      lastName: 'Devia',
      clientId: '34521325',
      email: 'angellandkoer6@gmail.com',
      phone: '04124456710',
      address: 'Avenida',
    },
  ]

  const filteredClient = clients.filter((client) => {
    return (
      client.firstName.toLowerCase().includes(filterName.toLowerCase()) &&
      client.clientId.includes(filterId)
    )
  })

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <h4 className="mb-0">Clients</h4>
      </CCardHeader>
      <CCardBody>
        <CForm className="mb-4">
          <CRow className="g-3">
            <CCol md={3}>
              <CFormInput
                type="text"
                placeholder="Filter by Name"
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
              />
            </CCol>
            <CCol md={3}>
              <CFormInput
                type="number"
                placeholder="Filter by ID"
                value={filterId}
                onChange={(e) => setFilterId(e.target.value)}
              />
            </CCol>
            <CCol md={3}>
              <CButton color="info" onClick={() => setVisibleAdd(true)}>
                Add Client
              </CButton>
            </CCol>
          </CRow>
        </CForm>

        <CTable hover responsive className="mt-4">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>First Name</CTableHeaderCell>
              <CTableHeaderCell>Last Name</CTableHeaderCell>
              <CTableHeaderCell>Client ID</CTableHeaderCell>
              <CTableHeaderCell>Email</CTableHeaderCell>
              <CTableHeaderCell>Phone</CTableHeaderCell>
              <CTableHeaderCell>Address</CTableHeaderCell>
              <CTableHeaderCell>Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {filteredClient.map((client, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{client.firstName}</CTableDataCell>
                <CTableDataCell>{client.lastName}</CTableDataCell>
                <CTableDataCell>{client.clientId}</CTableDataCell>
                <CTableDataCell>{client.email}</CTableDataCell>
                <CTableDataCell>{client.phone}</CTableDataCell>
                <CTableDataCell>{client.address}</CTableDataCell>
                <CTableDataCell>
                  <CButton
                    color="info"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedClient(client)
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
                      setSelectedClient(client)
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
            <CModalTitle>Add Client</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CFormInput placeholder="First Name" className="mb-3" />
            <CFormInput placeholder="Last Name" className="mb-3" />
            <CFormInput placeholder="User ID" className="mb-3" />
            <CFormInput placeholder="Email" className="mb-3" />
            <CFormInput placeholder="Phone" className="mb-3" />
            <CFormInput placeholder="Address" className="mb-3" />
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
            <CModalTitle>Edit Client</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CFormInput
              placeholder="First Name"
              defaultValue={selectedClient?.firstName}
              className="mb-3"
            />
            <CFormInput
              placeholder="Last Name"
              defaultValue={selectedClient?.lastName}
              className="mb-3"
            />
            <CFormInput
              placeholder="Client ID"
              defaultValue={selectedClient?.clientId}
              className="mb-3"
            />
            <CFormInput placeholder="Email" defaultValue={selectedClient?.email} className="mb-3" />
            <CFormInput placeholder="Phone" defaultValue={selectedClient?.phone} className="mb-3" />
            <CFormInput
              placeholder="Address"
              defaultValue={selectedClient?.address}
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
            <CModalTitle>Delete Client</CModalTitle>
          </CModalHeader>
          <CModalBody>
            Are you sure you want to delete {selectedClient?.firstName} {selectedClient?.lastName}?
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

export default ClientList
