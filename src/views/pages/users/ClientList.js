import React, { useEffect, useState } from 'react'
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
  const [clients, setClients] = useState([])
  const [newClient, setNewClient] = useState({
    id: '',
    firstName: '',
    lastName: '',
    clientId: '',
    email: '',
    phone: '',
    address: '',
  })

  const filteredClients = clients.filter((client) => {
    return (
      client.firstName.toLowerCase().includes(filterName.toLowerCase()) &&
      client.clientId.includes(filterId)
    )
  })

  const handleAddClient = async () => {
    setClients([...clients, newClient])
    try {
      await fetch('http://localhost:5000/clients', {
        method: 'POST',
        body: JSON.stringify(newClient),
      })
    } catch (error) {
      console.log('There was an error:', error)
    }
    setNewClient({
      firstName: '',
      lastName: '',
      clientId: '',
      email: '',
      phone: '',
      address: '',
    })
    setVisibleAdd(false)
  }

  const handleEditClient = async () => {
    setClients(clients.map((client) => (client.id === selectedClient.id ? selectedClient : client)))
    try {
      await fetch(`http://localhost:5000/clients/${selectedClient?.id}`, {
        method: 'PUT',
        body: JSON.stringify(selectedClient),
      })
    } catch (error) {
      console.log('There was an error:', error)
    }
    setVisibleEdit(false)
  }

  const handleDeleteClient = async () => {
    setClients(clients.filter((client) => client.id !== selectedClient.id))
    setVisibleDelete(false)
    try {
      await fetch(`http://localhost:5000/clients/${selectedClient.id}`, {
        method: 'DELETE',
      })
    } catch (error) {
      console.log('Error requested: ', error)
    }
  }

  const fetchClients = async () => {
    try {
      const response = await fetch('http://localhost:5000/clients')
      const data = await response.json()
      setClients(data)
    } catch (error) {
      console.error('Error fetching clients:', error)
    }
  }

  useEffect(() => {
    fetchClients()
  }, [])

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
                placeholder="Filter by Client ID"
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
              <CTableHeaderCell>ID</CTableHeaderCell>
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
            {filteredClients.map((client, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{client.id}</CTableDataCell>
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
            <CFormInput
              placeholder="ID"
              value={newClient.id}
              onChange={(e) => setNewClient({ ...newClient, id: e.target.value })}
              className="mb-3"
            />
            <CFormInput
              placeholder="First Name"
              value={newClient.firstName}
              onChange={(e) => setNewClient({ ...newClient, firstName: e.target.value })}
              className="mb-3"
            />
            <CFormInput
              placeholder="Last Name"
              value={newClient.lastName}
              onChange={(e) => setNewClient({ ...newClient, lastName: e.target.value })}
              className="mb-3"
            />
            <CFormInput
              placeholder="Client ID"
              value={newClient.clientId}
              onChange={(e) => setNewClient({ ...newClient, clientId: e.target.value })}
              className="mb-3"
            />
            <CFormInput
              placeholder="Email"
              value={newClient.email}
              onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
              className="mb-3"
            />
            <CFormInput
              placeholder="Phone"
              value={newClient.phone}
              onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
              className="mb-3"
            />
            <CFormInput
              placeholder="Address"
              value={newClient.address}
              onChange={(e) => setNewClient({ ...newClient, address: e.target.value })}
              className="mb-3"
            />
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleAdd(false)}>
              Cancel
            </CButton>
            <CButton color="info" onClick={handleAddClient}>
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
              placeholder="ID"
              value={selectedClient?.id || ''}
              onChange={(e) => setSelectedClient({ ...selectedClient, id: e.target.value })}
              className="mb-3"
            />
            <CFormInput
              placeholder="First Name"
              value={selectedClient?.firstName || ''}
              onChange={(e) => setSelectedClient({ ...selectedClient, firstName: e.target.value })}
              className="mb-3"
            />
            <CFormInput
              placeholder="Last Name"
              value={selectedClient?.lastName || ''}
              onChange={(e) => setSelectedClient({ ...selectedClient, lastName: e.target.value })}
              className="mb-3"
            />
            <CFormInput
              placeholder="Client ID"
              value={selectedClient?.clientId || ''}
              onChange={(e) => setSelectedClient({ ...selectedClient, clientId: e.target.value })}
              className="mb-3"
            />
            <CFormInput
              placeholder="Email"
              value={selectedClient?.email || ''}
              onChange={(e) => setSelectedClient({ ...selectedClient, email: e.target.value })}
              className="mb-3"
            />
            <CFormInput
              placeholder="Phone"
              value={selectedClient?.phone || ''}
              onChange={(e) => setSelectedClient({ ...selectedClient, phone: e.target.value })}
              className="mb-3"
            />
            <CFormInput
              placeholder="Address"
              value={selectedClient?.address || ''}
              onChange={(e) => setSelectedClient({ ...selectedClient, address: e.target.value })}
              className="mb-3"
            />
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleEdit(false)}>
              Cancel
            </CButton>
            <CButton color="info" onClick={handleEditClient}>
              Save
            </CButton>
          </CModalFooter>
        </CModal>

        <CModal visible={visibleDelete} onClose={() => setVisibleDelete(false)}>
          <CModalHeader>
            <CModalTitle>Confirm Delete</CModalTitle>
          </CModalHeader>
          <CModalBody>Are you sure you want to delete this client?</CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleDelete(false)}>
              Cancel
            </CButton>
            <CButton color="danger" onClick={handleDeleteClient}>
              Delete
            </CButton>
          </CModalFooter>
        </CModal>
      </CCardBody>
    </CCard>
  )
}
export default ClientList
