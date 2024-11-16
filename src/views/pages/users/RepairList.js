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
  const [repairs, setRepairs] = useState([
    {
      repairId: '001',
      model: 'Galaxy S21',
      clientName: 'Santiago',
      brand: 'Samsung',
      service: 'Pantalla rota',
      technician: 'Luis',
      price: 120,
      status: 'En proceso',
      password: '1234',
    },
  ])

  const filteredRepairs = repairs.filter((repair) => {
    return (
      repair.repairId.includes(filterRepairId) &&
      repair.model.toLowerCase().includes(filterModel.toLowerCase()) &&
      repair.clientName.toLowerCase().includes(filterName.toLowerCase())
    )
  })

  const handleDelete = () => {
    setRepairs(repairs.filter((repair) => repair.repairId !== selectedRepair.repairId))
    setVisibleDelete(false)
    setSelectedRepair(null)
  }

  const handleEdit = () => {
    setVisibleEdit(false)
    setSelectedRepair(null)
  }

  const handleAdd = () => {
    setVisibleAdd(false)
  }

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
            {filteredRepairs.map((repair, index) => (
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
                    value={repair.status}
                    onChange={(e) => setSelectedRepair({ ...repair, status: e.target.value })}
                  >
                    <option value="En proceso">En proceso</option>
                    <option value="Reparado">Reparado</option>
                    <option value="Entregado">Entregado</option>
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
            <CFormInput placeholder="Repair ID" className="mb-3" />
            <CFormInput placeholder="Model" className="mb-3" />
            <CFormInput placeholder="Brand" className="mb-3" />
            <CFormInput placeholder="Client Name" className="mb-3" />
            <CFormInput placeholder="Service" className="mb-3" />
            <CFormInput placeholder="Technician" className="mb-3" />
            <CFormInput placeholder="Price" className="mb-3" type="number" />
            <CFormSelect className="mb-3">
              <option value="En proceso">In Progress</option>
              <option value="Reparado">Repaired</option>
              <option value="Entregado">Delivered</option>
            </CFormSelect>
            <CFormInput placeholder="Password" className="mb-3" />
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleAdd(false)}>
              Cancel
            </CButton>
            <CButton color="info" onClick={handleAdd}>
              Save
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
              defaultValue={selectedRepair?.repairId}
              className="mb-3"
            />
            <CFormInput placeholder="Model" defaultValue={selectedRepair?.model} className="mb-3" />
            <CFormInput
              placeholder="Client Name"
              defaultValue={selectedRepair?.clientName}
              className="mb-3"
            />
            <CFormInput
              placeholder="Service"
              defaultValue={selectedRepair?.service}
              className="mb-3"
            />
            <CFormInput
              placeholder="Technician"
              defaultValue={selectedRepair?.technician}
              className="mb-3"
            />
            <CFormInput
              placeholder="Price"
              type="number"
              defaultValue={selectedRepair?.price}
              className="mb-3"
            />
            <CFormSelect className="mb-3" defaultValue={selectedRepair?.status}>
              <option value="En proceso">In Progress</option>
              <option value="Reparado">Repaired</option>
              <option value="Entregado">Delivered</option>
            </CFormSelect>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleEdit(false)}>
              Cancel
            </CButton>
            <CButton color="info" onClick={handleEdit}>
              Save
            </CButton>
          </CModalFooter>
        </CModal>

        <CModal visible={visibleDelete} onClose={() => setVisibleDelete(false)}>
          <CModalHeader>
            <CModalTitle>Confirm Delete</CModalTitle>
          </CModalHeader>
          <CModalBody>
            Are you sure you want to delete the repair for {selectedRepair?.clientName}?
          </CModalBody>
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
