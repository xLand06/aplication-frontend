import React, { useEffect, useState } from 'react';
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
} from '@coreui/react';
import { helpFetch } from '../../../Api/HelpFetch';

const api = helpFetch();

export const UserList = () => {
  const [filterName, setFilterName] = useState('');
  const [filterId, setFilterId] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [selectedUser , setSelectedUser ] = useState(null);
  const [users, setUsers] = useState([]);
  const [nameFiltered, setNameFiltered] = useState(null);
  const [newUser , setNewUser ] = useState({
    user_id: '',
    first_name: '',
    last_name: '',
    user_id: '',
    email: '',
    phone: '',
    role: '',
    status: '',
  });

  const [editedUser , setEditedUser ] = useState({
    user_id: '',
    first_name: '',
    last_name: '',
    user_id: '',
    email: '',
    phone: '',
    role: '',
    status: '',
  });

  
  const addUsers = () => {
    api.post('users', { body: newUser  }).then((response) => {
      if (!response.error) {
        // Reset newUser  state after successful addition
        setNewUser ({
          user_id: '',
          first_name: '',
          last_name: '',
          user_id: '',
          email: '',
          phone: '',
          role_id: '',
          status: '',
        });
        fetchUsers(); // Fetch updated user list
      } else {
        console.error("Error adding user:", response.error);
      }
    });
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setNewUser ({
      ...newUser ,
      [user_id]: value,
    });
  };

  const editUser  = async (user) => {
    const options = {
      body: user,
    };
    await api.put('users', options, user.user_id).then((data) => {
      if (!data.error) {
        fetchUsers();
      } else {
        console.error("Error updating user:", data.error);
      }
    });
  };

  const deleteUser  = async (user) => {
    await api.delet('users', user.user_id).then((response) => {
      if (!response.error) {
        fetchUsers();
      } else {
        console.error("Error deleting user:", response.error);
      }
    });
  };

  const fetchUsers = () => {
    api.get('users').then((data) => {
      console.log("Fetched users:", data); // Log fetched users
      if (!data.error) {
        console.log(setUsers(data))
        setUsers(data.users);
      } else {
        console.error("Error fetching users:", data.error);
      }
    });
  };
const [searchTerm, setSearchTerm] = useState('');


const filteredUsers = Array.isArray(users) ? users.filter(user =>
  user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  user.last_name.toLowerCase().includes(searchTerm.toLowerCase())
) : [];

  useEffect(() => {
    fetchUsers();
  }, []);
  

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <h4 className="mb-0">Users</h4>
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
                placeholder="Filter by User ID"
                value={filterId}
                onChange={(e) => setFilterId(e.target.value)}
              />
            </CCol>
            <CCol md={3}>
              <CFormInput
                type="text"
                placeholder="Filter by Role"
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
              />
            </CCol>
            <CCol md={3}>
              <CButton color="info" onClick={() => setVisibleAdd(true)}>
                Add User
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
              <CTableHeaderCell>User ID</CTableHeaderCell>
              <CTableHeaderCell>Email</CTableHeaderCell>
              <CTableHeaderCell>Phone</CTableHeaderCell>
              <CTableHeaderCell>Role</CTableHeaderCell>
              <CTableHeaderCell>Status</CTableHeaderCell>
              <CTableHeaderCell>Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {filteredUsers.map((user) => (
              <CTableRow key={user.user_id}>
                <CTableDataCell>{user.user_id}</CTableDataCell>
                <CTableDataCell>{user.first_name}</CTableDataCell>
                <CTableDataCell>{user.last_name}</CTableDataCell>
                <CTableDataCell>{user.cedula}</CTableDataCell>
                <CTableDataCell>{user.email}</CTableDataCell>
                <CTableDataCell>{user.phone}</CTableDataCell>
                <CTableDataCell>{user.role_id}</CTableDataCell>
                <CTableDataCell>{user.user_status}</CTableDataCell>
                <CTableDataCell>
             
                  <CButton
                    color="info"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedUser (user);
                      setEditedUser (user); // Copia los datos del usuario seleccionado
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
                      setSelectedUser (user);
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

        {/* Modal para agregar usuario */}
        <CModal visible={visibleAdd} onClose={() => setVisibleAdd(false)} size="lg">
          <CModalHeader>
            <CModalTitle>Add User</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CRow>
              <CCol md={6}>
                <label htmlFor="userId" className="form-label">
                  Enter ID
                </label>
                <CFormInput
                  id="userId"
                  placeholder="ID"
                  className="mb-3"
                  value={newUser .userId}
                  onChange={handleInputChange}
                />

                <label htmlFor="firstName" className="form-label">
                  Enter First Name
                </label>
                <CFormInput
                  id="firstName"
                  placeholder="First Name"
                  className="mb-3"
                  value={newUser .firstName}
                  onChange={handleInputChange}
                />

                <label htmlFor="lastName" className="form-label">
                  Enter Last Name
                </label>
                <CFormInput
                  id="lastName"
                  placeholder="Last Name"
                  className="mb-3"
                  value={newUser .lastName}
                  onChange={handleInputChange}
                />

                <label htmlFor="email" className="form-label">
                  Enter Email
                </label>
                <CFormInput
                  id="email"
                  placeholder="Surname@example.com"
                  className="mb-3"
                  value={newUser .email}
                  onChange={handleInputChange}
                />
              </CCol>

              <CCol md={6}>
                <label htmlFor="phone" className="form-label">
                  Enter Phone
                </label>
                <CFormInput
                  id="phone"
                  placeholder="Phone"
                  className="mb-3"
                  value={newUser .phone}
                  onChange={handleInputChange}
                />

                <label htmlFor="role" className="form-label">
                  Enter Role
                </label>
                <select
                  id="role"
                  className="form-select mb-3"
                  value={newUser .role}
                  onChange={handleInputChange}
                >
                  <option value="">Select Role</option>
                  <option value="Tecnico">Técnico</option>
                  <option value="Asistente">Asistente</option>
                </select>

                <label htmlFor="status" className="form-label">
                  Enter Status
                </label>
                <select
                  id="status"
                  className="form-select mb-3"
                  value={newUser .status}
                  onChange={handleInputChange}
                >
                  <option value="">Select Status</option>
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </select>
              </CCol>
            </CRow>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleAdd(false)}>
              Cancel
            </CButton>
            <CButton color="info" onClick={() => { addUsers(); setVisibleAdd(false); }}>
              Save
            </CButton>
          </CModalFooter>
        </CModal>

        {/* Modal para editar usuario */}
        <CModal visible={visibleEdit} onClose={() => setVisibleEdit(false)} size="lg">
          <CModalHeader>
            <CModalTitle>Edit User</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CRow>
              <CCol md={6}>
                <label htmlFor="editUser Id" className="form-label">
                  Enter ID
                </label>
                <CFormInput
                  id="editUser Id"
                  placeholder="ID"
                  className="mb-3"
                  value={editedUser.user_id}
                  onChange={(e) => setEditedUser ({ ...editedUser , user_id: e.target.value })}
                />

                <label htmlFor="editFirstName" className="form-label">
                  Enter First Name
                </label>
                <CFormInput
                  id="editFirstName"
                  placeholder="First Name"
                  className="mb-3"
                  value={editedUser.first_name}
                  onChange={(e) => setEditedUser ({ ...editedUser , firstName: e.target.value })}
                />

                <label htmlFor="editLastName" className="form-label">
                  Enter Last Name
                </label>
                <CFormInput
                  id="editLastName"
                  placeholder="Last Name"
                  className="mb-3"
                  value={editedUser.last_name}
                  onChange={(e) => setEditedUser ({ ...editedUser , lastName: e.target.value })}
                />

                <label htmlFor="editEmail" className="form-label">
                  Enter Email
                </label>
                <CFormInput
                  id="editEmail"
                  placeholder="Surname@example.com"
                  className="mb-3"
                  value={editedUser.email}
                  onChange={(e) => setEditedUser ({ ...editedUser , email: e.target.value })}
                />
              </CCol>

              <CCol md={6}>
                <label htmlFor="editPhone" className="form-label">
                  Enter Phone
                </label>
                <CFormInput
                  id="editPhone"
                  placeholder="Phone"
                  className="mb-3"
                  value={editedUser.phone}
                  onChange={(e) => setEditedUser ({ ...editedUser , phone: e.target.value })}
                />

                <label htmlFor="editRole" className="form-label">
                  Enter Role
                </label>
                <select
                  id="editRole"
                  className="form-select mb-3"
                  value={editedUser.role_id}
                  onChange={(e) => setEditedUser ({ ...editedUser , role: e.target.value })}
                >
                  <option value="">Select Role</option>
                  <option value="Tecnico">Técnico</option>
                  <option value="Asistente">Asistente</option>
                </select>

                <label htmlFor="editStatus" className="form-label">
                  Enter Status
                </label>
                <select
                  id="editStatus"
                  className="form-select mb-3"
                  value={editedUser.status}
                  onChange={(e) => setEditedUser ({ ...editedUser , status: e.target.value })}
                >
                  <option value="">Select Status</option>
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </select>
              </CCol>
            </CRow>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleEdit(false)}>
              Cancel
            </CButton>
            <CButton color="info" onClick={() => { editUser (editedUser ); setVisibleEdit(false); }}>
              Save
            </CButton>
          </CModalFooter>
        </CModal>

        {/* Modal para eliminar usuario */}
        <CModal visible={visibleDelete} onClose={() => setVisibleDelete(false)}>
          <CModalHeader>
            <CModalTitle>Confirm Delete</CModalTitle>
          </CModalHeader>
          <CModalBody>
            {selectedUser  ? (
              <p>
                Are you sure you want to delete the user {selectedUser .firstName}{' '}
                {selectedUser .lastName}?
              </p>
            ) : (
              <p>No user selected.</p>
            )}
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleDelete(false)}>
              Cancel
            </CButton>
            <CButton color="danger" onClick={() => { deleteUser (selectedUser ); setVisibleDelete(false); }}>
              Delete
            </CButton>
          </CModalFooter>
        </CModal>
      </CCardBody>
    </CCard>
  );
};

export default UserList;