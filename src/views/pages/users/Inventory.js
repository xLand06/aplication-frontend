import { useState, useEffect } from "react"
import {
  CCard,
  CButton,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormSelect,
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
} from "@coreui/react"
import { helpFetch } from "../../../Api/HelpFetch"

const api = helpFetch()
export const Inventory = () => {
  // Estados para filtros
  const [filterName, setFilterName] = useState("")
  const [filterId, setFilterId] = useState("")
  const [filterPartType, setFilterPartType] = useState("")

  // Estados para modales
  const [visibleAdd, setVisibleAdd] = useState(false)
  const [visibleEdit, setVisibleEdit] = useState(false)
  const [visibleDelete, setVisibleDelete] = useState(false)
  const [visibleAddPartType, setVisibleAddPartType] = useState(false)

  // Estados para datos
  const [selectedItem, setSelectedItem] = useState(null)
  const [items, setItems] = useState([])
  const [editedItem, setEditedItem] = useState ({
    id: "",
    supplierId: "",
    modelName: "",
    partType: "",
    quantity: 0,
    amount: "",
  })
  const [partTypes, setPartTypes] = useState([]) // Almacena los tipos de partes
  const [newPartType, setNewPartType] = useState({
    partName: ''
  }) // Almacena el nuevo tipo de parte

  // Estado para nuevo item
  const [newItem, setNewItem] = useState({
    id: "",
    supplierId: "",
    modelName: "",
    partType: "",
    quantity: "",
    amount: "",
  })

  // Filtrar items
  const filteredItems = items.filter((item) => {
    return (
      (item.modelName?.toLowerCase() || "").includes(filterName?.toLowerCase() || "") &&
      (item.id?.includes(filterId) || "") &&
      (item.partType?.toLowerCase() || "").includes(filterPartType?.toLowerCase() || "")
    )
  })

  // Agregar nuevo parte de pieza

  const addNewPartType =  async () => {
    await api.post('partTypes', { body: newPartType }).then((response) => {
      if (!response.error) {
        setNewPartType({
          partName: ''
        })
        fetchPartTypes()
      }
    })
  }

  const fetchPartTypes = async () => {
    await api.get('partTypes').then ((data) => {
      if (!data.error && Array.isArray(data)){
        setPartTypes(data)
      } 
    })
  }   

  const addItem = async () => {
    const response = await api.post('inventory', { body: newItem });
    if (!response.error) {
      setNewItem({
        id: "",
        supplierId: "",
        modelName: "",
        partType: "",
        quantity: 0,
        amount: "",
      });
      fetchItems(); 
    }
  }
  
  const handleEditItem = async () => {
    const options = {
        body: editedItem, // Usa editedItem en lugar de item
    };

    // Asegúrate de que el ID del item esté presente
    if (editedItem.id) {
        const response = await api.put('inventory', options, editedItem.id);
        if (!response.error) {
            fetchItems(); // Refresca la lista de items después de editar
        } else {
            console.error("Error updating item:", response.error);
        }
    } else {
        console.error("Item ID is required for editing.");
    }
};


  // Eliminar un item
  
  const handleDeleteItem = async () => {
    if (selectedItem && selectedItem.id) {
        const response = await api.delet('inventory', selectedItem.id);
        if (!response.error) {
            fetchItems(); // Refresca la lista de items después de eliminar
        } else {
            console.error("Error deleting item:", response.error);
        }
    } else {
        console.error("Item ID is required for deletion.");
    }
};

  

  // Obtener los items del servidor
  

  const fetchItems = async () => {
    await api.get('inventory').then ((data) => {
      if (!data.error && Array.isArray(data)){
        setItems(data)
      } 
    })
  }   

  useEffect(() => {
    fetchPartTypes()
    fetchItems()
  }, [])

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
              <CButton variant="outline" color="secondary" onClick={() => setVisibleAddPartType(true)} className="ms-2">
                Add Part Type
              </CButton>
            </CCol>
          </CRow>
        </CForm>

        <CTable hover responsive className="mt-4">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>ID</CTableHeaderCell>
              <CTableHeaderCell>Supplier ID</CTableHeaderCell>
              <CTableHeaderCell>Model Name</CTableHeaderCell>
              <CTableHeaderCell>Part Type</CTableHeaderCell>
              <CTableHeaderCell>Quantity</CTableHeaderCell>
              <CTableHeaderCell>Amount</CTableHeaderCell>
              <CTableHeaderCell>Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {filteredItems.map((item, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{item.id}</CTableDataCell>
                <CTableDataCell>{item.supplierId}</CTableDataCell>
                <CTableDataCell>{item.modelName}</CTableDataCell>
                <CTableDataCell>{item.partType}</CTableDataCell>
                <CTableDataCell>{item.quantity}</CTableDataCell>
                <CTableDataCell>${item.amount}</CTableDataCell>
                <CTableDataCell>
                <CButton
    color="info"
    variant="outline"
    size="sm"
    onClick={() => {
        setSelectedItem(item);
        setEditedItem(item); // Asegúrate de que editedItem tenga los datos del item seleccionado
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
        setSelectedItem(item); // Establece el item seleccionado
        setVisibleDelete(true); // Muestra el modal de confirmación
    }}
>
    Delete
</CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>

        <CModal visible={visibleAdd} onClose={() => setVisibleAdd(false)} size="lg" className="modal-dialog-centered">
          <CModalHeader>
            <CModalTitle>Add Item</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CRow>
              <CCol md={6}>
                <div className="mb-3">
                  <label htmlFor="addId" className="form-label">
                    Enter ID
                  </label>
                  <CFormInput
                    id="addId"
                    placeholder="ID"
                    value={newItem.id}
                    onChange={(e) => setNewItem({ ...newItem, id: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="addSupplierId" className="form-label">
                    Enter Supplier ID
                  </label>
                  <CFormInput
                    id="addSupplierId"
                    placeholder="Supplier ID"
                    value={newItem.supplierId}
                    onChange={(e) => setNewItem({ ...newItem, supplierId: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="addModelName" className="form-label">
                    Enter Brand and Model
                  </label>
                  <CFormInput
                    id="addModelName"
                    placeholder="Model Phone Name"
                    value={newItem.modelName}
                    onChange={(e) => setNewItem({ ...newItem, modelName: e.target.value })}
                  />
                </div>
              </CCol>
              <CCol md={6}>
                <div className="mb-3">
                  <label htmlFor="addPartType" className="form-label">
                    Enter Part Type
                  </label>
                  <CFormSelect
                    id="addPartType"
                    value={newItem.partType}
                    onChange={(e) => setNewItem({ ...newItem, partType: e.target.value })}
                  >
                    <option value="">Select Part Type</option>
                    {partTypes.map((type) => (
                      <option key={type.id} value={type.partName}>
                        {type.partName}
                      </option>
                    ))}
                  </CFormSelect>
                </div>
                <div className="mb-3">
                  <label htmlFor="addQuantity" className="form-label">
                    Enter Quantity
                  </label>
                  <CFormInput
                    id="addQuantity"
                    placeholder="Quantity"
                    value={newItem.quantity}
                    type="number"
                    onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="addAmount" className="form-label">
                    Enter Amount
                  </label>
                  <CFormInput
                    id="addAmount"
                    placeholder="Amount"
                    value={newItem.amount}
                    type="number"
                    onChange={(e) => setNewItem({ ...newItem, amount: e.target.value })}
                  />
                </div>
              </CCol>
            </CRow>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleAdd(false)}>
              Cancel
            </CButton>
            <CButton
              color="info"
              onClick={() => {
                addItem();
                setVisibleAdd(false)
              }}
            >
              Save
            </CButton>
          </CModalFooter>
        </CModal>

        <CModal visible={visibleEdit} onClose={() => setVisibleEdit(false)} size="lg" className="modal-dialog-centered">
    <CModalHeader>
        <CModalTitle>Edit Item</CModalTitle>
    </CModalHeader>
    <CModalBody>
        <CRow>
            <CCol md={6}>
                <div className="mb-3">
                    <label htmlFor="editId" className="form-label">Enter ID</label>
                    <CFormInput
                        id="editId"
                        placeholder="ID"
                        value={editedItem.id || ""}
                        onChange={(e) => setEditedItem({ ...editedItem, id: e.target.value })}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="editSupplierId" className="form-label">Enter Supplier ID</label>
                    <CFormInput
                        id="editSupplierId"
                        placeholder="Supplier ID"
                        value={editedItem.supplierId || ""}
                        onChange={(e) => setEditedItem({ ...editedItem, supplierId: e.target.value })}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="editModelName" className="form-label">Enter Brand and Model</label>
                    <CFormInput
                        id="editModelName"
                        placeholder="Model Phone Name"
                        value={editedItem.modelName || ""}
                        onChange={(e) => setEditedItem({ ...editedItem, modelName: e.target.value })}
                    />
                </div>
            </CCol>
            <CCol md={6}>
                <div className="mb-3">
                    <label htmlFor="editPartType" className="form-label">Enter Part Type</label>
                    <CFormSelect
                        id="editPartType"
                        value={editedItem.partType || ""}
                        onChange={(e) => setEditedItem({ ...editedItem, partType: e.target.value })}
                    >
                        <option value="">Select Part Type</option>
                        {partTypes.map((type) => (
                            <option key={type.id} value={type.partName}>
                                {type.partName}
                            </option>
                        ))}
                    </CFormSelect>
                </div>
                <div className="mb-3">
                    <label htmlFor="editQuantity" className="form-label">Enter Quantity</label>
                    <CFormInput
                        id="editQuantity"
                        placeholder="Quantity"
                        value={editedItem.quantity || 0}
                        type="number"
                        onChange={(e) => setEditedItem({ ...editedItem, quantity: e.target.value })}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="editAmount" className="form-label">Enter Amount</label>
                    <CFormInput
                        id="editAmount"
                        placeholder="Amount"
                        value={editedItem.amount || ""}
                        type="number"
                        onChange={(e) => setEditedItem({ ...editedItem, amount: e.target.value })}
                    />
                </div>
            </CCol>
        </CRow>
    </CModalBody>
    <CModalFooter>
        <CButton color="secondary" onClick={() => setVisibleEdit(false)}>Cancel</CButton>
        <CButton color="info" onClick={() => { handleEditItem(); setVisibleEdit(false); }}>Save</CButton>
    </CModalFooter>
</CModal>

<CModal visible={visibleDelete} onClose={() => setVisibleDelete(false)} className="modal-dialog-centered">
    <CModalHeader>
        <CModalTitle>Confirm Deletion</CModalTitle>
    </CModalHeader>
    <CModalBody>
        <p>Are you sure you want to delete the item with ID: {selectedItem?.id}?</p>
    </CModalBody>
    <CModalFooter>
        <CButton color="secondary" onClick={() => setVisibleDelete(false)}>
            Cancel
        </CButton>
        <CButton color="danger" onClick={() => { handleDeleteItem(); setVisibleDelete(false); }}>
            Delete
        </CButton>
    </CModalFooter>
</CModal>

        <CModal
          visible={visibleAddPartType}
          onClose={() => setVisibleAddPartType(false)}
          className="modal-dialog-centered"
        >
          <CModalHeader>
            <CModalTitle>Add Part Type</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <div className="mb-3">
              <label htmlFor="addPartType" className="form-label">
                Enter a New Part Type
              </label>
              <CFormInput
                id="partName"
                placeholder="Part Type"
                value={newPartType.partName}
                onChange={(e) => setNewPartType({
                  partName: e.target.value
                })}
              />
            </div>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleAddPartType(false)}>
              Cancel
            </CButton>
            <CButton color="info" onClick={() => {addNewPartType() ; setVisibleAddPartType(false)}}>
              Save
            </CButton>
          </CModalFooter>
        </CModal>
      </CCardBody>
    </CCard>
  )
}

export default Inventory

