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

export const Suppliers = () => {
  const [filterName, setFilterName] = useState('')
  const [filterId, setFilterId] = useState('')
  const [visibleAdd, setVisibleAdd] = useState(false)
  const [visibleEdit, setVisibleEdit] = useState(false)
  const [visibleDelete, setVisibleDelete] = useState(false)
  const [selectedSupplier, setSelectedSupplier] = useState(null)
  const [suppliers, setSuppliers] = useState([]) // Lista de proveedores
  const [newSupplier, setNewSupplier] = useState({
    supplierName: '',
    supplierId: '',
    email: '',
    phone: '',
    address: '',
  })
  const [editSupplier, setEditSupplier] = useState(null) // Para la edición

  const filteredSuppliers = suppliers.filter((supplier) => {
    return (
      supplier.supplierName.toLowerCase().includes(filterName.toLowerCase()) &&
      supplier.supplierId.includes(filterId)
    )
  })

  const handleAddSupplier = async () => {
    setSuppliers([...suppliers, newSupplier])
    try {
      await fetch('http://localhost:5000/suppliers', {
        method: 'POST',
        body: JSON.stringify(newSupplier),
      })
    } catch (error) {
      console.error('There was an error:', error)
    }
    setNewSupplier({ supplierName: '', supplierId: '', email: '', phone: '', address: '' })
    setVisibleAdd(false)
  }

  const handleEditSupplier = async () => {
    const updatedSuppliers = suppliers.map((supplier) =>
      supplier.supplierId === editSupplier.supplierId ? editSupplier : supplier,
    )
    setSuppliers(updatedSuppliers)
    try {
      await fetch(`http://localhost:5000/suppliers/${editSupplier.supplierId}`, {
        method: 'PUT',
        body: JSON.stringify(editSupplier),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      console.error('Error updating supplier:', error)
    }
    setVisibleEdit(false)
  }

  const handleDeleteSupplier = async () => {
    const updatedSuppliers = suppliers.filter(
      (supplier) => supplier.supplierId !== selectedSupplier.supplierId,
    )
    setSuppliers(updatedSuppliers)
    setVisibleDelete(false)
    try {
      await fetch(`http://localhost:5000/suppliers/${selectedSupplier.supplierId}`, {
        method: 'DELETE',
      })
    } catch (error) {
      console.error('Error deleting supplier:', error)
    }
  }

  const fetchSuppliers = async () => {
    try {
      const response = await fetch('http://localhost:5000/suppliers')
      if (!response.ok) throw new Error('Failed to fetch suppliers')
      const data = await response.json()
      setSuppliers(data)
    } catch (error) {
      console.error('Error fetching suppliers:', error)
    }
  }

  useEffect(() => {
    fetchSuppliers()
    // Optional cleanup
    return () => {
      setSuppliers([])
    }
  }, [])

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
            {filteredSuppliers.map((supplier) => (
              <CTableRow key={supplier.supplierId}>
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
                      setEditSupplier(supplier)
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

        {/* Add Supplier Modal */}
        <CModal visible={visibleAdd} onClose={() => setVisibleAdd(false)}>
          <CModalHeader>
            <CModalTitle>Add Supplier</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CFormInput
              placeholder="Supplier Name"
              value={newSupplier.supplierName}
              onChange={(e) => setNewSupplier({ ...newSupplier, supplierName: e.target.value })}
              className="mb-3"
            />
            <CFormInput
              placeholder="Supplier ID"
              value={newSupplier.supplierId}
              onChange={(e) => setNewSupplier({ ...newSupplier, supplierId: e.target.value })}
              className="mb-3"
            />
            <CFormInput
              placeholder="Email"
              value={newSupplier.email}
              onChange={(e) => setNewSupplier({ ...newSupplier, email: e.target.value })}
              className="mb-3"
            />
            <CFormInput
              placeholder="Phone"
              value={newSupplier.phone}
              onChange={(e) => setNewSupplier({ ...newSupplier, phone: e.target.value })}
              className="mb-3"
            />
            <CFormInput
              placeholder="Address"
              value={newSupplier.address}
              onChange={(e) => setNewSupplier({ ...newSupplier, address: e.target.value })}
              className="mb-3"
            />
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleAdd(false)}>
              Cancel
            </CButton>
            <CButton color="info" onClick={handleAddSupplier}>
              Save
            </CButton>
          </CModalFooter>
        </CModal>

        {/* Edit Supplier Modal */}
        <CModal visible={visibleEdit} onClose={() => setVisibleEdit(false)}>
          <CModalHeader>
            <CModalTitle>Edit Supplier</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CFormInput
              placeholder="Supplier Name"
              value={editSupplier?.supplierName || ''}
              onChange={(e) => setEditSupplier({ ...editSupplier, supplierName: e.target.value })}
              className="mb-3"
            />
            <CFormInput
              placeholder="Supplier ID"
              value={editSupplier?.supplierId || ''}
              onChange={(e) => setEditSupplier({ ...editSupplier, supplierId: e.target.value })}
              className="mb-3"
            />
            <CFormInput
              placeholder="Email"
              value={editSupplier?.email || ''}
              onChange={(e) => setEditSupplier({ ...editSupplier, email: e.target.value })}
              className="mb-3"
            />
            <CFormInput
              placeholder="Phone"
              value={editSupplier?.phone || ''}
              onChange={(e) => setEditSupplier({ ...editSupplier, phone: e.target.value })}
              className="mb-3"
            />
            <CFormInput
              placeholder="Address"
              value={editSupplier?.address || ''}
              onChange={(e) => setEditSupplier({ ...editSupplier, address: e.target.value })}
              className="mb-3"
            />
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleEdit(false)}>
              Cancel
            </CButton>
            <CButton color="info" onClick={handleEditSupplier}>
              Save
            </CButton>
          </CModalFooter>
        </CModal>

        {/* Delete Supplier Modal */}
        <CModal visible={visibleDelete} onClose={() => setVisibleDelete(false)}>
          <CModalHeader>
            <CModalTitle>Delete Supplier</CModalTitle>
          </CModalHeader>
          <CModalBody>Are you sure you want to delete {selectedSupplier?.supplierName}?</CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleDelete(false)}>
              Cancel
            </CButton>
            <CButton color="danger" onClick={handleDeleteSupplier}>
              Delete
            </CButton>
          </CModalFooter>
        </CModal>
      </CCardBody>
    </CCard>
  )
}

export default Suppliers
