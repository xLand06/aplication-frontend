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

export const Suppliers = () => {
  const [filterName, setFilterName] = useState('')
  const [filterId, setFilterId] = useState('')
  const [visibleAdd, setVisibleAdd] = useState(false)
  const [visibleEdit, setVisibleEdit] = useState(false)
  const [visibleDelete, setVisibleDelete] = useState(false)
  const [selectedSupplier, setSelectedSupplier] = useState(null)

  const suppliers = [
    {
      supplierName: 'Canguro',
      supplierId: 'SUP001',
      email: 'canguro@gmail.com',
      phone: '0414-7108890',
      address: 'Centro Cívico',
    },
    {
      supplierName: 'TecnoPro',
      supplierId: 'SUP002',
      email: 'tecnopro@gmail.com',
      phone: '0424-7801015',
      address: 'Centro Cívico',
    },
  ]

  const filteredSuppliers = suppliers.filter((supplier) => {
    return (
      supplier.supplierName.toLowerCase().includes(filterName.toLowerCase()) &&
      supplier.supplierId.includes(filterId)
    )
  })

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <h4 className="mb-0">Suppliers</h4>
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
                type="text"
                placeholder="Filter by ID"
                value={filterId}
                onChange={(e) => setFilterId(e.target.value)}
              />
            </CCol>
            <CCol md={3}>
              <CButton color="info" onClick={() => setVisibleAdd(true)}>
                Add Supplier
              </CButton>
            </CCol>
          </CRow>
        </CForm>

        <CTable hover responsive className="mt-4">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>Supplier Name</CTableHeaderCell>
              <CTableHeaderCell>Supplier ID</CTableHeaderCell>
              <CTableHeaderCell>Email</CTableHeaderCell>
              <CTableHeaderCell>Phone</CTableHeaderCell>
              <CTableHeaderCell>Address</CTableHeaderCell>
              <CTableHeaderCell>Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {filteredSuppliers.map((supplier, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{supplier.supplierName}</CTableDataCell>
                <CTableDataCell>{supplier.supplierId}</CTableDataCell>
                <CTableDataCell>{supplier.email}</CTableDataCell>
                <CTableDataCell>{supplier.phone}</CTableDataCell>
                <CTableDataCell>{supplier.address}</CTableDataCell>
                <CTableDataCell>
                  <CButton
                    color="info"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedSupplier(supplier)
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
                      setSelectedSupplier(supplier)
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
            <CModalTitle>Add Supplier</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CFormInput placeholder="Supplier Name" className="mb-3" />
            <CFormInput placeholder="Supplier ID" className="mb-3" />
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
            <CModalTitle>Edit Supplier</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CFormInput
              placeholder="Supplier Name"
              defaultValue={selectedSupplier?.supplierName}
              className="mb-3"
            />
            <CFormInput
              placeholder="Supplier ID"
              defaultValue={selectedSupplier?.supplierId}
              className="mb-3"
            />
            <CFormInput
              placeholder="Email"
              defaultValue={selectedSupplier?.email}
              className="mb-3"
            />
            <CFormInput
              placeholder="Phone"
              defaultValue={selectedSupplier?.phone}
              className="mb-3"
            />
            <CFormInput
              placeholder="Address"
              defaultValue={selectedSupplier?.address}
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
            <CModalTitle>Delete Supplier</CModalTitle>
          </CModalHeader>
          <CModalBody>Are you sure you want to delete {selectedSupplier?.supplierName}?</CModalBody>
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

export default Suppliers
