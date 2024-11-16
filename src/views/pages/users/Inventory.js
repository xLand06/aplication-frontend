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

export const Inventory = () => {
  const [filterName, setFilterName] = useState('')
  const [filterId, setFilterId] = useState('')
  const [filterPartType, setFilterPartType] = useState('')
  const [visibleAdd, setVisibleAdd] = useState(false)
  const [visibleEdit, setVisibleEdit] = useState(false)
  const [visibleDelete, setVisibleDelete] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  const inventoryItems = [
    {
      modelName: 'iPhone 11',
      itemId: '001',
      partType: 'Pantalla',
      quantity: 15,
      supplier: 'Canguro',
    },
    {
      modelName: 'Samsung S20',
      itemId: '002',
      partType: 'Bateria',
      quantity: 20,
      supplier: 'TecnoPro',
    },
  ]

  const filteredInventory = inventoryItems.filter((item) => {
    return (
      item.modelName.toLowerCase().includes(filterName.toLowerCase()) &&
      item.itemId.includes(filterId) &&
      item.partType.toLowerCase().includes(filterPartType.toLowerCase())
    )
  })

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <h4 className="mb-0">Inventory</h4>
      </CCardHeader>
      <CCardBody>
        <CForm className="mb-4">
          <CRow className="g-3">
            <CCol md={3}>
              <CFormInput
                type="text"
                placeholder="Filter by Model Name"
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
              />
            </CCol>
            <CCol md={3}>
              <CFormInput
                type="text"
                placeholder="Filter by ID"
                value={filterId}
                onChange={(e) => setFilterId(e.target.value)}
              />
            </CCol>
            <CCol md={3}>
              <CFormInput
                type="text"
                placeholder="Filter by Part Type"
                value={filterPartType}
                onChange={(e) => setFilterPartType(e.target.value)}
              />
            </CCol>
            <CCol md={3}>
              <CButton color="info" onClick={() => setVisibleAdd(true)}>
                Add Item
              </CButton>
            </CCol>
          </CRow>
        </CForm>

        <CTable hover responsive className="mt-4">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>Model Name</CTableHeaderCell>
              <CTableHeaderCell>Item ID</CTableHeaderCell>
              <CTableHeaderCell>Part Type</CTableHeaderCell>
              <CTableHeaderCell>Quantity</CTableHeaderCell>
              <CTableHeaderCell>Supplier</CTableHeaderCell>
              <CTableHeaderCell>Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {filteredInventory.map((item, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{item.modelName}</CTableDataCell>
                <CTableDataCell>{item.itemId}</CTableDataCell>
                <CTableDataCell>{item.partType}</CTableDataCell>
                <CTableDataCell>{item.quantity}</CTableDataCell>
                <CTableDataCell>{item.supplier}</CTableDataCell>
                <CTableDataCell>
                  <CButton
                    color="info"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedItem(item)
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
                      setSelectedItem(item)
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
            <CModalTitle>Add Inventory Item</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CFormInput placeholder="Model Name" className="mb-3" />
            <CFormInput placeholder="Item ID" className="mb-3" />
            <CFormInput placeholder="Part Type" className="mb-3" />
            <CFormInput placeholder="Quantity" type="number" className="mb-3" />
            <CFormInput placeholder="Supplier" className="mb-3" />
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
            <CModalTitle>Edit Inventory Item</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CFormInput
              placeholder="Model Name"
              defaultValue={selectedItem?.modelName}
              className="mb-3"
            />
            <CFormInput
              placeholder="Item ID"
              defaultValue={selectedItem?.itemId}
              className="mb-3"
            />
            <CFormInput
              placeholder="Part Type"
              defaultValue={selectedItem?.partType}
              className="mb-3"
            />
            <CFormInput
              placeholder="Quantity"
              type="number"
              defaultValue={selectedItem?.quantity}
              className="mb-3"
            />
            <CFormInput
              placeholder="Supplier"
              defaultValue={selectedItem?.supplier}
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
            <CModalTitle>Delete Inventory Item</CModalTitle>
          </CModalHeader>
          <CModalBody>Are you sure you want to delete {selectedItem?.modelName}?</CModalBody>
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

export default Inventory
