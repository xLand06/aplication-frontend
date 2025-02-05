import React, { useEffect, useState } from 'react'
import { helpFetch } from '../../../Api/HelpFetch.js'
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


const api = helpFetch ();
export const ClientList = () => {

  const [filterName, setFilterName] = useState('')
  const [filterId, setFilterId] = useState('')
  const [visibleAdd, setVisibleAdd] = useState(false)
  const [visibleEdit, setVisibleEdit] = useState(false)
  const [visibleDelete, setVisibleDelete] = useState(false)
  const [selectedClient, setSelectedClient] = useState(null)
  const [clients, setClients] = useState([])
  const [newClient, setNewClient] = useState({
    client_id: '',
    first_name: '',
    last_name: '',
    clients_id: '',
    email: '',
    phone: '',
    address: '',
  })

  
  const filteredClients = clients.filter((client) => {
    return (
      client.first_name?.toLowerCase().includes(filterName.toLowerCase()) &&
      client.clients_id?.includes(filterId)
    )
  })
 

  const addClients = () => {
    api.post('clients', { body: newClient }).then((response) => {
      if (!response.error) {
        setNewClient({
          first_name: '',
          last_name: '',
          clients_id: '',
          email: '',
          phone: '',
          address: '',
        })
        fetchClients()
      }
    })
  }
  
  const handleInputChange = (e) => {
    const { id, value } = e.target
    setNewClient({
      ...newClient,
      [id]: value,
})
 }
  
  

  const editClients = async (client) => {
    const options = {
      body: client
    }
    await api.put('clients',options,client.client_id).then((data) => {
      if (!data.error){
        fetchClients()
      }}
    )
  }

  
 const deleteClients = async (client) => { 
  await api.delet ('clients',client.client_id).then((response) => {
    if (!response.error){
      fetchClients()
    }
  }
)
 }

 const fetchClients = () => {
  api.get('clients').then((data) => {
    console.log('Fetched Data:', data); // Agrega un console.log para ver qué llega
    if (!data.error) {
      setClients(data.clients);
    } else {
      console.error('Error fetching clients or invalid data format:', data);
    }
  });
};


useEffect(() => {
  fetchClients()
}, [clients])


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
                <CTableDataCell>{client.client_id}</CTableDataCell>
                <CTableDataCell>{client.first_name}</CTableDataCell>
                <CTableDataCell>{client.last_name}</CTableDataCell>
                <CTableDataCell>{client.clients_id}</CTableDataCell>
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
          <CForm onSubmit={addClients}>
            
            
            <label htmlFor="Enter ID" className="form-label">Enter Client ID</label>
            <CFormInput
              id="id"
              placeholder="Client ID"
              value={newClient.client_id}
              onChange={handleInputChange}
              className="mb-3"
            />
            <label htmlFor="Enter firstName" className="form-label">Enter First Name</label>
            <CFormInput
              id="firstName"
              placeholder="First Name"
              value={newClient.first_name}
              onChange={handleInputChange}
              className="mb-3"
            />
            <label htmlFor="Enter LastName" className="form-label">Enter Last Name</label>
            <CFormInput
              id="lastName"
              placeholder="Last Name"
              value={newClient.last_name}
              onChange={handleInputChange}
              className="mb-3"
            />
             <label htmlFor="Idendity Card" className="form-label">Enter Idendity Card</label>
             <CFormInput
              id="clients_id"
              placeholder="Client ID"
              value={newClient.clients_id}
              onChange={handleInputChange}
              className="mb-3"
            />
            <label htmlFor="email" className="form-label">Enter Email</label>
            <CFormInput
              id="email"
              placeholder="surname@example.com"
              value={newClient.email}
              onChange={handleInputChange}
              className="mb-3"
            />
            <label htmlFor="phone" className="form-label">Enter Phone</label>
            <CFormInput
              id="phone"
              placeholder="Phone"
              value={newClient.phone}
              onChange={handleInputChange}
              className="mb-3"
            />
            <label htmlFor="address" className="form-label">Enter Address</label>
            <CFormInput
              id="address"
              placeholder="Address"
              value={newClient.address}
              onChange={handleInputChange}
              className="mb-3"
            />
          </CForm>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleAdd(false)}>
              Cancel
            </CButton>
            <CButton color="info" onClick={addClients}>
              Save
            </CButton>
          </CModalFooter>
        </CModal>

            <CModal visible={visibleEdit} onClose={() => setVisibleEdit(false)}>
          <CModalHeader>
            <CModalTitle>Edit Client</CModalTitle>
          </CModalHeader>
          <CModalBody>
          <label htmlFor="clientId" className="form-label">Enter Client ID</label>
            <CFormInput
              id="clientId"
              placeholder="Client ID"
              value={selectedClient?.id || '' } 
              onChange={(e) => setSelectedClient({ ...selectedClient, id: e.target.value })}
              className="mb-3"
            />
            <label htmlFor="editFirstName" className="form-label">Enter First Name</label>
            <CFormInput
              id="editFirstName"
              placeholder="First Name"
              value={selectedClient?.first_name || ''}
              onChange={(e) => setSelectedClient({ ...selectedClient, firstName: e.target.value })}
              className="mb-3"
            />
            <label htmlFor="editLastName" className="form-label">Enter Last Name</label>
            <CFormInput
              id="editLastName"
              placeholder="Last Name"
              value={selectedClient?.last_name || ''}
              onChange={(e) => setSelectedClient({ ...selectedClient, lastName: e.target.value })}
              className="mb-3"
            />
             <label htmlFor="Idendity Card" className="form-label">Enter Idendity Card</label>
             <CFormInput
              id="clientId"
              placeholder="Client ID"
              value={selectedClient?.clients_id|| ''}
              onChange={(e) => setSelectedClient({ ...selectedClient, clientId: e.target.value })}
              className="mb-3"
            />
            <label htmlFor="editEmail" className="form-label">Enter Email</label>
            <CFormInput
              id="editEmail"
              placeholder="surname@example.com"
              value={selectedClient?.email || ''}
              onChange={(e) => setSelectedClient({ ...selectedClient, email: e.target.value })}
              className="mb-3"
            />
            <label htmlFor="editPhone" className="form-label">Enter Phone</label>
            <CFormInput
              id="editPhone"
              placeholder="Phone"
              value={selectedClient?.phone || ''}
              onChange={(e) => setSelectedClient({ ...selectedClient, phone: e.target.value })}
              className="mb-3"
            />
            <label htmlFor="editAddress" className="form-label">Enter Address</label>
            <CFormInput
              id="editAddress"
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
            <CButton color="info" onClick={() => {editClients(selectedClient);setVisibleEdit(false) }}>
              Save
            </CButton>
          </CModalFooter>
        </CModal>

        <CModal visible={visibleDelete} onClose={() => setVisibleDelete(false)}>
          <CModalHeader>
            <CModalTitle>Confirm Delete</CModalTitle>
          </CModalHeader>
          <CModalBody>
            {selectedClient ? (
              <p>Are you sure you want to delete this client?</p>
            ) : (
              <p>No client selected.</p>
            )}
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleDelete(false)}>
              Cancel
            </CButton>
            <CButton color="danger" onClick={() => {deleteClients (selectedClient); setVisibleDelete(false)}}>
              Delete
            </CButton>
          </CModalFooter>
        </CModal>
      </CCardBody>
    </CCard>
  )
}

export default ClientList