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
  CFormSelect,
} from '@coreui/react'

export const RepairList = () => {
  const [filterRepairId, setFilterRepairId] = useState('')
  const [filterModel, setFilterModel] = useState('')
  const [filterName, setFilterName] = useState('')
  const [visibleAdd, setVisibleAdd] = useState(false)
  const [visibleEdit, setVisibleEdit] = useState(false)
  const [visibleDelete, setVisibleDelete] = useState(false)
  const [selectedRepair, setSelectedRepair] = useState(null)
  const [repairs, setRepairs] = useState([])
  const [newRepair, setNewRepair] = useState({
    repairId: '',
    model: '',
    clientName: '',
    brand: '',
    service: '',
    technician: '',
    price: 0,
    status: '',
    password: '',
  })

  const filteredRepairs = repairs?.filter((repair) => {
    return (
      (repair.repairId?.includes(filterRepairId) || filterRepairId === '') &&
      (repair.model ? repair.model.toLowerCase().includes(filterModel.toLowerCase()) : false) &&
      (repair.clientName
        ? repair.clientName.toLowerCase().includes(filterName.toLowerCase())
        : false)
    )
  })

  const handleAdd = async () => {
    setRepairs([...repairs, newRepair])
    try {
      await fetch('http://localhost:5000/repairs', {
        method: 'POST',

        body: JSON.stringify(newRepair),
      })
    } catch (error) {
      console.log('There was an error:', error)
    }
    setNewRepair({
      repairId: '',
      model: '',
      clientName: '',
      brand: '',
      service: '',
      technician: '',
      price: 0,
      status: '',
      password: '',
    })
    setVisibleAdd(false)
  }

  const handleEdit = async () => {
    setRepairs(
      repairs.map((repair) =>
        repair.repairId === selectedRepair.repairId ? selectedRepair : repair,
      ),
    )
    try {
      await fetch(`http://localhost:5000/repairs/${selectedRepair?.repairId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedRepair),
      })
    } catch (error) {
      console.log('There was an error:', error)
    }
    setVisibleEdit(false)
    setSelectedRepair(null)
  }

  const handleDelete = async () => {
    setRepairs(repairs.filter((repair) => repair.repairId !== selectedRepair.repairId))
    setVisibleDelete(false)
    try {
      await fetch(`http://localhost:5000/repairs/${selectedRepair.repairId}`, {
        method: 'DELETE',
      })
    } catch (error) {
      console.log('Error requested: ', error)
    }
    setSelectedRepair(null)
  }

  const fetchRepairs = async () => {
    try {
      const response = await fetch('http://localhost:5000/repairs')
      const data = await response.json()
      setRepairs(data)
    } catch (error) {
      console.error('Error fetching repairs:', error)
    }
  }

  useEffect(() => {
    fetchRepairs()
  }, [])

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <h4 className="mb-0">Repair List</h4>
      </CCardHeader>
      <CCardBody>
        <CForm className="mb-4">
          <CRow className="g-3">
            <CCol md={3}>
              <CFormInput
                type="text"
                placeholder="Filter by Repair ID"
                value={filterRepairId}
                onChange={(e) => setFilterRepairId(e.target.value)}
              />
            </CCol>
            <CCol md={3}>
              <CFormInput
                type="text"
                placeholder="Filter by Model"
                value={filterModel}
                onChange={(e) => setFilterModel(e.target.value)}
              />
            </CCol>
            <CCol md={3}>
              <CFormInput
                type="text"
                placeholder="Filter by name client"
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
              />
            </CCol>
            <CCol md={3}>
              <CButton color="info" onClick={() => setVisibleAdd(true)}>
                Add Repair
              </CButton>
            </CCol>
          </CRow>
        </CForm>

        <CTable hover responsive className="mt-4">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>ID Repair</CTableHeaderCell>
              <CTableHeaderCell>Model</CTableHeaderCell>
              <CTableHeaderCell>Brand</CTableHeaderCell>
              <CTableHeaderCell>Client Name</CTableHeaderCell>
              <CTableHeaderCell>Service</CTableHeaderCell>
              <CTableHeaderCell>Technician</CTableHeaderCell>
              <CTableHeaderCell>Price</CTableHeaderCell>
              <CTableHeaderCell>Status</CTableHeaderCell>
              <CTableHeaderCell>Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {filteredRepairs?.map((repair, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{repair.repairId}</CTableDataCell>
                <CTableDataCell>{repair.model}</CTableDataCell>
                <CTableDataCell>{repair.brand}</CTableDataCell>
                <CTableDataCell>{repair.clientName}</CTableDataCell>
                <CTableDataCell>{repair.service}</CTableDataCell>
                <CTableDataCell>{repair.technician}</CTableDataCell>
                <CTableDataCell>${repair.price}</CTableDataCell>
                <CTableDataCell>
                  <CFormSelect
                    value={repair?.status}
                    onChange={(e) => setSelectedRepair({ ...repair, status: e.target.value })}
                  >
                    <option value="">Select Status</option>
                    <option value="En proceso">In Progress</option>
                    <option value="Reparado">Repaired</option>
                    <option value="Entregado">Delivered</option>
                  </CFormSelect>
                </CTableDataCell>
                <CTableDataCell>
                  <CButton
                    color="info"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedRepair(repair)
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
                      setSelectedRepair(repair)
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
            <CModalTitle>Add Repair</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CFormInput
              placeholder="Repair ID"
              value={newRepair.repairId}
              onChange={(e) => setNewRepair({ ...newRepair, repairId: e.target.value })}
              className="mb-3"
            />
            <CFormInput
              placeholder="Model"
              value={newRepair.model}
              onChange={(e) => setNewRepair({ ...newRepair, model: e.target.value })}
              className="mb-3"
            />
            <CFormInput
              placeholder="Brand"
              value={newRepair.brand}
              onChange={(e) => setNewRepair({ ...newRepair, brand: e.target.value })}
              className="mb-3"
            />
            <CFormInput
              placeholder="Client Name"
              value={newRepair.clientName}
              onChange={(e) => setNewRepair({ ...newRepair, clientName: e.target.value })}
              className="mb-3"
            />
            <CFormInput
              placeholder="Service"
              value={newRepair.service}
              onChange={(e) => setNewRepair({ ...newRepair, service: e.target.value })}
              className="mb-3"
            />
            <CFormInput
              placeholder="Technician"
              value={newRepair.technician}
              onChange={(e) => setNewRepair({ ...newRepair, technician: e.target.value })}
              className="mb-3"
            />
            <CFormInput
              placeholder="Price"
              type="number"
              value={newRepair.price}
              onChange={(e) => setNewRepair({ ...newRepair, price: e.target.value })}
              className="mb-3"
            />
            <CFormSelect
              value={newRepair.status}
              onChange={(e) => setNewRepair({ ...newRepair, status: e.target.value })}
              className="mb-3"
            >
              <option value="">Select Status</option>
              <option value="En proceso">In Progress</option>
              <option value="Reparado">Repaired</option>
              <option value="Entregado">Delivered</option>
            </CFormSelect>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleAdd(false)}>
              Cancel
            </CButton>
            <CButton color="primary" onClick={handleAdd}>
              Add Repair
            </CButton>
          </CModalFooter>
        </CModal>

        <CModal visible={visibleEdit} onClose={() => setVisibleEdit(false)}>
          <CModalHeader>
            <CModalTitle>Edit Repair</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CFormInput
              placeholder="Repair ID"
              value={selectedRepair?.repairId}
              onChange={(e) => setSelectedRepair({ ...selectedRepair, repairId: e.target.value })}
              className="mb-3"
            />
            <CFormInput
              placeholder="Model"
              value={selectedRepair?.model}
              onChange={(e) => setSelectedRepair({ ...selectedRepair, model: e.target.value })}
              className="mb-3"
            />
            <CFormInput
              placeholder="Brand"
              value={selectedRepair?.brand}
              onChange={(e) => setSelectedRepair({ ...selectedRepair, brand: e.target.value })}
              className="mb-3"
            />
            <CFormInput
              placeholder="Client Name"
              value={selectedRepair?.clientName}
              onChange={(e) => setSelectedRepair({ ...selectedRepair, clientName: e.target.value })}
              className="mb-3"
            />
            <CFormInput
              placeholder="Service"
              value={selectedRepair?.service}
              onChange={(e) => setSelectedRepair({ ...selectedRepair, service: e.target.value })}
              className="mb-3"
            />
            <CFormInput
              placeholder="Technician"
              value={selectedRepair?.technician}
              onChange={(e) => setSelectedRepair({ ...selectedRepair, technician: e.target.value })}
              className="mb-3"
            />
            <CFormInput
              placeholder="Price"
              value={selectedRepair?.price}
              onChange={(e) => setSelectedRepair({ ...selectedRepair, price: e.target.value })}
              className="mb-3"
            />
            <CFormSelect
              value={selectedRepair?.status}
              onChange={(e) => setSelectedRepair({ ...selectedRepair, status: e.target.value })}
              className="mb-3"
            >
              <option value="En proceso">In Progress</option>
              <option value="Reparado">Repaired</option>
              <option value="Entregado">Delivered</option>
            </CFormSelect>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleEdit(false)}>
              Cancel
            </CButton>
            <CButton color="primary" onClick={handleEdit}>
              Save Changes
            </CButton>
          </CModalFooter>
        </CModal>

        <CModal visible={visibleDelete} onClose={() => setVisibleDelete(false)}>
          <CModalHeader>
            <CModalTitle>Delete Repair</CModalTitle>
          </CModalHeader>
          <CModalBody>Are you sure you want to delete this repair?</CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleDelete(false)}>
              Cancel
            </CButton>
            <CButton color="danger" onClick={handleDelete}>
              Delete
            </CButton>
          </CModalFooter>
        </CModal>
      </CCardBody>
    </CCard>
  )
}

export default RepairList
