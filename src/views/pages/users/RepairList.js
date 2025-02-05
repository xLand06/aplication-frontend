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
  CFormSelect,
  CModalHeader,
  CModalTitle,
} from '@coreui/react';
import { helpFetch } from '../../../Api/HelpFetch';

const api = helpFetch();
export const RepairList = () => {
  const [filterId, setFilterId] = useState('');
  const [filterIMEI, setFilterIMEI] = useState('');
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [visiblePayment, setVisiblePayment] = useState(false);
  
  const [selectedRepair, setSelectedRepair] = useState(null);
  const [repairs, setRepairs] = useState([]); 
  const [newPayment, setNewPayment] = useState({
    id: '',
    repairId: '',
    clientId: '',
    clientName: '',
    referenceNumber: '',
    paymentMethod: '',
    amount: '',
    date: '',
    descriptions: '',
  });// Lista de reparaciones
  const [newRepair, setNewRepair] = useState({
    id: '',
    userId: '',
    clientId: '',
    brand: '',
    model: '',
    imei: '',
    password: '', // Agregado
    repairedPart: '',
    status: '',
    date: '',
    observations: '',
  });
  const [editedRepair, setEditedRepair] = useState({
    id: '',
    userId: '',
    clientId: '',
    brand: '',
    model: '',
    imei: '',
    password: '', // Agregado
    repairedPart: '',
    status: '',
    date: '',
    observations: '',
  });

  const filteredRepairs = repairs.filter((repair) => {
    return (
      repair.id.includes(filterId) &&
      repair.imei.includes(filterIMEI)
    );
  });

  const handlePaymentChange = (e) => {
    const { id, value } = e.target;
    setNewPayment({
      ...newPayment,
      [id]: value,
    });
  };

  const addRepair = () => {
    api.post('repairs', { body: newRepair }).then((response) => {
      if (!response.error) {
        setNewRepair({
          id: '',
          userId: '',
          clientId: '',
          brand: '',
          model: '',
          imei: '',
          password: '', // Reiniciar
          repairedPart: '',
          status: '',
          date: '',
          observations: '',
        });
        fetchRepairs();
      }
    });
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setNewRepair({
      ...newRepair,
      [id]: value,
    });
  };

  const editRepair = async (repair) => {
    const options = {
      body: repair,
    };
    await api.put('repairs', options, repair.id).then((data) => {
      if (!data.error) {
        fetchRepairs();
      }
    });
  };

  const deleteRepair = async (repair) => {
    await api.delet('repairs', repair.id).then((response) => {
      if (!response.error) {
        fetchRepairs();
      }
    });
  };

  const fetchRepairs = () => {
    api.get('repairs').then((data) => {
      if (!data.error && Array.isArray(data)) {
        setRepairs(data);
      }
    });
  };

  useEffect(() => {
    fetchRepairs();
  }, []);

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
                placeholder="Filter by ID"
                value={filterId}
                onChange={(e) => setFilterId(e.target.value)}
              />
            </CCol>
            <CCol md={3}>
              <CFormInput
                type="text"
                placeholder="Filter by IMEI"
                value={filterIMEI}
                onChange={(e) => setFilterIMEI(e.target.value)}
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
              <CTableHeaderCell>ID</CTableHeaderCell>
              <CTableHeaderCell>User ID</CTableHeaderCell>
              <CTableHeaderCell>Client ID</CTableHeaderCell>
              <CTableHeaderCell>Brand</CTableHeaderCell>
              <CTableHeaderCell>Model</CTableHeaderCell>
              <CTableHeaderCell>IMEI</CTableHeaderCell>
              <CTableHeaderCell>Password</CTableHeaderCell> {/* Agregado */}
              <CTableHeaderCell>Repaired Part</CTableHeaderCell>
              <CTableHeaderCell>Status</CTableHeaderCell>
              <CTableHeaderCell>Date</CTableHeaderCell>
              <CTableHeaderCell>Observations</CTableHeaderCell>
              <CTableHeaderCell>Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {filteredRepairs.map((repair) => (
              <CTableRow key={repair.id}>
                <CTableDataCell>{repair.id}</CTableDataCell>
                <CTableDataCell>{repair.userId}</CTableDataCell>
                <CTableDataCell>{repair.clientId}</CTableDataCell>
                <CTableDataCell>{repair.brand}</CTableDataCell>
                <CTableDataCell>{repair.model}</CTableDataCell>
                <CTableDataCell>{repair.imei}</CTableDataCell>
                <CTableDataCell>{repair.password}</CTableDataCell> {/* Agregado */}
                <CTableDataCell>{repair.repairedPart}</CTableDataCell>
                <CTableDataCell>{repair.status}</CTableDataCell>
                <CTableDataCell>{repair.date}</CTableDataCell>
                <CTableDataCell>{repair.observations}</CTableDataCell>
                <CTableDataCell>
                  <CButton
                    color="info"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditedRepair(repair);
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
                      setSelectedRepair(repair);
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

        <CModal visible={visiblePayment} onClose={() => setVisiblePayment(false)} >
  <CModalHeader>
    <CModalTitle>Add Payment</CModalTitle>
  </CModalHeader>
  <CModalBody>
    <CRow>
      <CCol md={6}>
        <div className="mb-3">
          <CFormLabel>ID</CFormLabel>
          <CFormInput
            id="id"
            placeholder="ID"
            value={newPayment.id}
            onChange={handlePaymentChange}
          />
        </div>
        <div className="mb-3">
          <CFormLabel>Enter Repair ID</CFormLabel>
          <CFormInput
            id="repairId"
            placeholder="Repair ID"
            value={newPayment.repairId}
            onChange={handlePaymentChange}
          />
        </div>
        <div className="mb-3">
          <CFormLabel>Enter Client ID</CFormLabel>
          <CFormInput
            id="clientId"
            placeholder="Client ID"
            value={newPayment.clientId}
            onChange={handlePaymentChange}
          />
        </div>
        <div className="mb-3">
          <CFormLabel>Enter Client Name</CFormLabel>
          <CFormInput
            id="clientName"
            placeholder="Client Name"
            value={newPayment.clientName}
            onChange={handlePaymentChange}
          />
        </div>
      </CCol>
      <CCol md={6}>
        <div className="mb-3">
          <CFormLabel>Enter Reference Number</CFormLabel>
          <CFormInput
            id="referenceNumber"
            placeholder="Reference Number"
            value={newPayment.referenceNumber}
            onChange={handlePaymentChange}
          />
        </div>
        <div className="mb-3">
          <CFormLabel>Payment Method</CFormLabel>
          <CFormSelect
            id="paymentMethod"
            value={newPayment.paymentMethod}
            onChange={handlePaymentChange}
          >
            <option value="">Select Payment Method</option>
            <option value="Cash">Cash</option>
            <option value="Transfer">Transfer</option>
            <option value="Mobile payment">Mobile Payment</option>
          </CFormSelect>
        </div>
        <div className="mb-3">
          <CFormLabel>Enter Amount</CFormLabel>
          <CFormInput
            id="amount"
            placeholder="Amount"
            value={newPayment.amount}
            type="number"
            onChange={handlePaymentChange}
          />
        </div>
        <div className="mb-3">
          <CFormLabel>Enter DateTime</CFormLabel>
          <CFormInput
            id="date"
            placeholder="Date"
            type="datetime-local"
            value={newPayment.date}
            onChange={handlePaymentChange}
          />
        </div>
      </CCol>
      <CCol md={12}>
        <div className="mb-3">
          <CFormLabel>Enter Descriptions</CFormLabel>
          <CFormInput
            id="descriptions"
            placeholder="Descriptions or Observations"
            value={newPayment.descriptions}
            onChange={handlePaymentChange}
          />
        </div>
      </CCol>
    </CRow>
  </CModalBody>
  <CModalFooter>
    <CButton color="secondary" onClick={() => setVisiblePayment(false)}>
      Cancel
    </CButton>
    <CButton color="info" onClick={() => {
      // Aquí puedes agregar la lógica para guardar el pago
      console.log(newPayment); // Para depuración
      setVisiblePayment(false);
    }}>
      Save
    </CButton>
  </CModalFooter>
</CModal>

       {/* Modal para agregar reparación */}
<CModal visible={visibleAdd} onClose={() => setVisibleAdd(false)}  size='xl'>
  <CModalHeader>
    <CModalTitle>Add Repair</CModalTitle>
  </CModalHeader>
  <CModalBody>
    <CRow>
      <CCol md={6}>
        <div className="mb-3">
          <CFormLabel>ID</CFormLabel>
          <CFormInput
            id="id"
            placeholder="ID"
            value={newRepair.id}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <CFormLabel>User ID</CFormLabel>
          <CFormInput
            id="userId"
            placeholder="User  ID"
            value={newRepair.userId}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <CFormLabel>Client ID</CFormLabel>
          <CFormInput
            id="clientId"
            placeholder="Client ID"
            value={newRepair.clientId}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <CFormLabel>Brand</CFormLabel>
          <CFormInput
            id="brand"
            placeholder="Brand"
            value={newRepair.brand}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <CFormLabel>Model</CFormLabel>
          <CFormInput
            id="model"
            placeholder="Model"
            value={newRepair.model}
            onChange={handleInputChange}
          />
        </div>
      </CCol>
      <CCol md={6}>
        <div className="mb-3">
          <CFormLabel>IMEI</CFormLabel>
          <CFormInput
            id="imei"
            placeholder="IMEI"
            value={newRepair.imei}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <CFormLabel>Password</CFormLabel>
          <CFormInput
            id="password"
            type="text"
            placeholder="Password"
            value={newRepair.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <CFormLabel>Repaired Part</CFormLabel>
          <CFormInput
            id="repairedPart"
            placeholder="Repaired Part"
            value={newRepair.repairedPart}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
  <CFormLabel>Status</CFormLabel>
  <CFormSelect
    id="status"
    value={editedRepair?.status || ''}
    onChange={(e) => {
      const selectedStatus = e.target.value;
      setEditedRepair({ ...editedRepair, status: selectedStatus });
      if (selectedStatus === 'delivered') {
        setNewPayment({
          ...newPayment,
          repairId: editedRepair.id, // Asigna el ID de la reparación
          clientId: editedRepair.clientId, // Asigna el Client ID si está disponible
          clientName: editedRepair.clientName || '', // Asigna el Client Name si está disponible
        });
        setVisiblePayment(true); setVisibleAdd(false)// Abre la modal de pago
      }
    }}
  >
    <option value="">Select Status</option>
    <option value="In progress">In Progress</option>
    <option value="Repaired">Repaired</option>
    <option value="Delivered">Delivered</option>
  </CFormSelect>
</div>
        <div className="mb-3">
          <CFormLabel>Date</CFormLabel>
          <CFormInput
            id="date"
            type="date"
            placeholder="Date"
            value={newRepair.date}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <CFormLabel>Observations</CFormLabel>
          <CFormInput
            id="observations"
            placeholder="Observations"
            value={newRepair.observations}
            onChange={handleInputChange}
          />
        </div>
      </CCol>
    </CRow>
  </CModalBody>
  <CModalFooter>
    <CButton color="secondary" onClick={() => setVisibleAdd(false)} >
      Cancel
    </CButton>
    <CButton color="info" onClick={() => { addRepair(); setVisibleAdd(false); }}>
      Save
    </CButton>
  </CModalFooter>
</CModal>

       
{/* Modal para editar reparación */}
<CModal visible={visibleEdit} onClose={() => setVisibleEdit(false)} size='xl'>
  <CModalHeader>
    <CModalTitle>Edit Repair</CModalTitle>
  </CModalHeader>
  <CModalBody>
    <CRow>
      <CCol md={6}>
        <div className="mb-3">
          <CFormLabel>ID</CFormLabel>
          <CFormInput
            id="id"
            placeholder="ID"
            value={editedRepair?.id || ''}
            onChange={(e) => setEditedRepair({ ...editedRepair, id: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <CFormLabel>User ID</CFormLabel>
          <CFormInput
            id="userId"
            placeholder="User   ID"
            value={editedRepair?.userId || ''}
            onChange={(e) => setEditedRepair({ ...editedRepair, userId: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <CFormLabel>Client ID</CFormLabel>
          <CFormInput
            id="clientId"
            placeholder="Client ID"
            value={editedRepair?.clientId || ''}
            onChange={(e) => setEditedRepair({ ...editedRepair, clientId: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <CFormLabel>Brand</CFormLabel>
          <CFormInput
            id="brand"
            placeholder="Brand"
            value={editedRepair?.brand || ''}
            onChange={(e) => setEditedRepair({ ...editedRepair, brand: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <CFormLabel>Model</CFormLabel>
          <CFormInput
            id="model"
            placeholder="Model"
            value={editedRepair?.model || ''}
            onChange={(e) => setEditedRepair({ ...editedRepair, model: e.target.value })}
          />
        </div>
      </CCol>
      <CCol md={6}>
        <div className="mb-3">
          <CFormLabel>IMEI</CFormLabel>
          <CFormInput
            id="imei"
            placeholder="IMEI"
            value={editedRepair?.imei || ''}
            onChange={(e) => setEditedRepair({ ...editedRepair, imei: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <CFormLabel>Password</CFormLabel>
          <CFormInput
            id="password"
            type="text"
            placeholder="Password"
            value={editedRepair?.password || ''}
            onChange={(e) => setEditedRepair({ ...editedRepair, password: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <CFormLabel>Repaired Part</CFormLabel>
          <CFormInput
            id="repairedPart"
            placeholder="Repaired Part"
            value={editedRepair?.repairedPart || ''}
            onChange={(e) => setEditedRepair({ ...editedRepair, repairedPart: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <CFormLabel>Status</CFormLabel>
          <CFormSelect
            id="status"
            value={editedRepair?.status || ''}
            onChange={(e) => {
              const selectedStatus = e.target.value;
              setEditedRepair({ ...editedRepair, status: selectedStatus });
              if (selectedStatus === 'delivered') {
                setNewPayment({
                  ...newPayment,
                  repairId: editedRepair.id, // Asigna el ID de la reparación
                  clientId: editedRepair.clientId, // Asigna el Client ID si está disponible
                  clientName: editedRepair.clientName || '', // Asigna el Client Name si está disponible
                });
                setVisiblePayment(true); // Abre la modal de pago
                setVisibleEdit(false); // Cierra la modal de edición
              }
            }}
          >
            <option value="">Select Status</option>
            <option value="In progress">In Progress</option>
            <option value="Repaired">Repaired</option>
            <option value="Delivered">Delivered</option>
          </CFormSelect>
        </div>
        <div className="mb-3">
          <CFormLabel>Date</CFormLabel>
          <CFormInput
            id="date"
            type="date"
            placeholder="Date"
            value={editedRepair?.date || ''}
            onChange={(e) => setEditedRepair({ ...editedRepair, date: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <CFormLabel>Observations</CFormLabel>
          <CFormInput
            id="observations"
            placeholder="Observations"
            value={editedRepair?.observations || ''}
            onChange={(e) => setEditedRepair({ ...editedRepair, observations: e.target.value })}
          />
        </div>
      </CCol>
    </CRow>
  </CModalBody>
  <CModalFooter>
    <CButton color="secondary" onClick={() => setVisibleEdit(false)}>
      Cancel
    </CButton>
    <CButton color="info" onClick={() => { editRepair(editedRepair); setVisibleEdit(false); }}>
      Save
    </CButton>
  </CModalFooter>
</CModal>

        {/* Modal para eliminar reparación */}
        <CModal visible={visibleDelete} onClose={() => setVisibleDelete(false)}>
          <CModalHeader>
            <CModalTitle>Delete Repair</CModalTitle>
          </CModalHeader>
          <CModalBody>
            Are you sure you want to delete the repair with ID {selectedRepair?.id}?
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleDelete(false)}>
              Cancel
            </CButton>
            <CButton color="danger" onClick={() => { deleteRepair(selectedRepair); setVisibleDelete(false); }}>
              Delete
            </CButton>
          </CModalFooter>
        </CModal>
      </CCardBody>
    </CCard>
  );
};

export default RepairList;