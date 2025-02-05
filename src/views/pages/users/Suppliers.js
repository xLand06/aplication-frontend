import React, { useState, useEffect } from 'react';
import {
  CCard,
  CButton,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
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
} from '@coreui/react';
import { helpFetch } from '../../../Api/HelpFetch';
 
const api = helpFetch()
export const Suppliers = () => {
  const [filterName, setFilterName] = useState('');
  const [filterId, setFilterId] = useState('');
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [suppliers, setSuppliers] = useState([]); // Lista de proveedores
  const [newSupplier, setNewSupplier] = useState({
    id: '',
    supplierName: '',
    email: '',
    phone: '',
    address: '',
  });
  const [editedSupplier, setEditedSupplier] = useState({
    id: '',
    supplierName: '',
    email: '',
    phone: '',
    address: '',
  }); 

  const filteredSuppliers = suppliers.filter((supplier) => {
    return (
      supplier.supplier_name.toLowerCase().includes(filterName.toLowerCase()) 
    );
  });

  const addSupplier = () => {
    api.post('suppliers', { body: newSupplier }).then((response) => {
      if (!response.error) {
        setNewSupplier({
          id: '',
          supplierName: '',
          email: '',
          phone: '',
          address: '',
        })
        fetchSuppliers()
      }
    })
  }
  const handleInputChange = (e) => {
    const { id, value } = e.target
    setNewSupplier({
      ...newSupplier,
      [id]: value,
})
 }
  
  const editSupplier = async (supplier) => {
    const options = {
      body: supplier
    }
    await api.put('suppliers',options,supplier.id).then((data) => {
      if (!data.error){
        fetchSuppliers()
      }}
    )
  }

  
 const deleteSupplier = async (supplier) => { 
  await api.delet ('suppliers',supplier.id).then((response) => {
    if (!response.error){
      fetchSuppliers()
    }
  }
)
 }

  const fetchSuppliers = () => {
    api.get('suppliers').then ((data) => {
      console.log(data)
      if (!data.error){
        setSuppliers(data.suppliers)
      } 
    })
  }   
  
  
useEffect(() => {
  fetchSuppliers()
}, [suppliers])

useEffect(() => {
  
}, [suppliers])

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
              <CTableHeaderCell>ID</CTableHeaderCell>
              <CTableHeaderCell>Supplier Name</CTableHeaderCell>
              <CTableHeaderCell>Email</CTableHeaderCell>
              <CTableHeaderCell>Phone</CTableHeaderCell>
              <CTableHeaderCell>Address</CTableHeaderCell>
              <CTableHeaderCell>Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {filteredSuppliers.map((supplier) => (
              <CTableRow key={supplier.supplier_id}>
                <CTableDataCell>{supplier.supplier_id}</CTableDataCell>
                <CTableDataCell>{supplier.supplier_name}</CTableDataCell>
                <CTableDataCell>{supplier.email}</CTableDataCell>
                <CTableDataCell>{supplier.phone}</CTableDataCell>
                <CTableDataCell>{supplier.address}</CTableDataCell>
                <CTableDataCell>
                  <CButton
                    color="info"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditedSupplier(supplier);
                      setVisibleEdit(true);
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
                      setSelectedSupplier(supplier);
                      setVisibleDelete(true);
                    }}
                  >
                    Delete
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>

        {/* Modal para agregar proveedor */}
        <CModal visible={visibleAdd} onClose={() => setVisibleAdd(false)}>
          <CModalHeader>
            <CModalTitle>Add Supplier</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <div className="mb-3">
              <CFormLabel>Supplier ID</CFormLabel>
              <CFormInput
              id='id'
                placeholder="Supplier ID"
                value={newSupplier.id}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <CFormLabel>Supplier Name</CFormLabel>
              <CFormInput
               id='supplierName'
                placeholder="Supplier Name"
                value={newSupplier.supplierName}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <CFormLabel>Email</CFormLabel>
              <CFormInput
              id='email'
                placeholder="Email"
                value={newSupplier.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <CFormLabel>Phone</CFormLabel>
              <CFormInput
               id='phone'
                placeholder="Phone"
                value={newSupplier.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <CFormLabel>Address</CFormLabel>
              <CFormInput
                id='address'
                placeholder="Address"
                value={newSupplier.address}
                onChange={handleInputChange}
              />
            </div>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleAdd(false)}>
              Cancel
            </CButton>
            <CButton color="info" onClick={() => {addSupplier(newSupplier) ;  setVisibleAdd(false)}}>
              Save
            </CButton>
          </CModalFooter>
        </CModal>

        {/* Modal para editar proveedor */}
        <CModal visible={visibleEdit} onClose={() => setVisibleEdit(false)}>
          <CModalHeader>
            <CModalTitle>Edit Supplier</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <div className="mb-3">
              <CFormLabel>Supplier ID</CFormLabel>
              <CFormInput
              id='id'
                placeholder="Supplier ID"
                value={editedSupplier?.id || ''}
                onChange={(e) => setEditedSupplier({ ...editedSupplier, id: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <CFormLabel>Supplier Name</CFormLabel>
              <CFormInput
              id='supplierName'
                placeholder="Supplier Name"
                value={editedSupplier?.supplierName || ''}
                onChange={(e) => setEditedSupplier({ ...editedSupplier, supplierName: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <CFormLabel>Email</CFormLabel>
              <CFormInput
                id='email'
                placeholder="Email"
                value={editedSupplier?.email || ''}
                onChange={(e) => setEditedSupplier({ ...editedSupplier, email: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <CFormLabel>Phone</CFormLabel>
              <CFormInput
              id='phone'
                placeholder="Phone"
                value={editedSupplier?.phone || ''}
                onChange={(e) => setEditedSupplier({ ...editedSupplier, phone: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <CFormLabel>Address</CFormLabel>
              <CFormInput
              id='address'
                placeholder="Address"
                value={editedSupplier?.address || ''}
                onChange={(e) => setEditedSupplier({ ...editedSupplier, address: e.target.value })}
              />
            </div>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleEdit(false)}>
              Cancel
            </CButton>
            <CButton color="info" onClick={() => {editSupplier(editedSupplier) ;  setVisibleEdit(false)}}>
              Save
            </CButton>
          </CModalFooter>
        </CModal>

        {/* Modal para eliminar proveedor */}
        <CModal visible={visibleDelete} onClose={() => setVisibleDelete(false)}>
          <CModalHeader>
            <CModalTitle>Delete Supplier</CModalTitle>
          </CModalHeader>
          <CModalBody>
            Are you sure you want to delete {selectedSupplier?.supplierName}?
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleDelete(false)}>
              Cancel
            </CButton>
            <CButton color="danger" onClick={() => {deleteSupplier (selectedSupplier); setVisibleDelete(false)}}>
              Delete
            </CButton>
          </CModalFooter>
        </CModal>
      </CCardBody>
    </CCard>
  );
};

export default Suppliers;