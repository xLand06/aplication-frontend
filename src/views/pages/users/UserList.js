import React, { useEffect, useState } from 'react'
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

export const UserList = () => {
  const [filterName, setFilterName] = useState('')
  const [filterId, setFilterId] = useState('')
  const [filterRole, setFilterRole] = useState('')
  const [visibleAdd, setVisibleAdd] = useState(false)
  const [visibleEdit, setVisibleEdit] = useState(false)
  const [visibleDelete, setVisibleDelete] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [users, setUsers] = useState([])
  const [newUser, setNewUser] = useState({
    id: '',
    firstName: '',
    lastName: '',
    userId: '',
    email: '',
    phone: '',
    role: '',
    status: '',
  })

  const filteredUsers = users.filter((user) => {
    return (
      user.firstName.toLowerCase().includes(filterName.toLowerCase()) &&
      user.userId.includes(filterId) &&
      user.role.toLowerCase().includes(filterRole.toLowerCase())
    )
  })

  const handleAddUser = async () => {
    try {
      const response = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      })

      if (response.ok) {
        const addedUser = await response.json()
        setUsers([...users, addedUser])
      } else {
        console.log('Error al agregar el usuario:', response.statusText)
      }
    } catch (error) {
      console.log('There was an error:', error)
    }

    setNewUser({
      id: '',
      firstName: '',
      lastName: '',
      userId: '',
      email: '',
      phone: '',
      role: '',
      status: '',
    })

    setVisibleAdd(false)
  }

  const handleEditUser = async () => {
    const updatedUsers = users.map((user) =>
      user.userId === editedUser.userId ? editedUser : user,
    )

    try {
      const response = await fetch(`http://localhost:5000/users/${editedUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedUser),
      })

      if (response.ok) {
        setUsers(updatedUsers)
      } else {
        console.log('Error al editar el usuario:', response.statusText)
      }
    } catch (error) {
      console.log('There was an error:', error)
    }

    setSelectedUser(null)
    setVisibleEdit(false)
  }

  const handleDeleteUser = async () => {
    const updatedUsers = users.filter((user) => user.userId !== selectedUser.userId)
    setUsers(updatedUsers)
    setSelectedUser(null)

    try {
      await fetch(`http://localhost:5000/users/${selectedUser.id}`, {
        method: 'DELETE',
      })
    } catch (error) {
      console.log('Error requesting delete: ', error)
    }

    setVisibleDelete(false)
  }

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/users')
      const data = await response.json()
      setUsers(data)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const [editedUser, setEditedUser] = useState({
    id: '',
    firstName: '',
    lastName: '',
    userId: '',
    email: '',
    phone: '',
    role: '',
    status: '',
  })

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
              <CTableRow key={user.userId}>
                <CTableDataCell>{user.id}</CTableDataCell>
                <CTableDataCell>{user.firstName}</CTableDataCell>
                <CTableDataCell>{user.lastName}</CTableDataCell>
                <CTableDataCell>{user.userId}</CTableDataCell>
                <CTableDataCell>{user.email}</CTableDataCell>
                <CTableDataCell>{user.phone}</CTableDataCell>
                <CTableDataCell>{user.role}</CTableDataCell>
                <CTableDataCell>{user.status}</CTableDataCell>
                <CTableDataCell>
                  <CButton
                    color="info"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedUser(user)
                      setEditedUser(user)
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
                      setSelectedUser(user)
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
            <CModalTitle>Add User</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CFormInput
              placeholder="ID"
              className="mb-3"
              value={newUser.id}
              onChange={(e) => setNewUser({ ...newUser, id: e.target.value })}
            />
            <CFormInput
              placeholder="First Name"
              className="mb-3"
              value={newUser.firstName}
              onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
            />
            <CFormInput
              placeholder="Last Name"
              className="mb-3"
              value={newUser.lastName}
              onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
            />
            <CFormInput
              placeholder="User ID"
              className="mb-3"
              value={newUser.userId}
              onChange={(e) => setNewUser({ ...newUser, userId: e.target.value })}
            />
            <CFormInput
              placeholder="Email"
              className="mb-3"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
            <CFormInput
              placeholder="Phone"
              className="mb-3"
              value={newUser.phone}
              onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
            />
            <select
              className="form-select mb-3"
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            >
              <option value="">Select Role</option>
              <option value="Tecnico">Técnico</option>
              <option value="Asistente">Asistente</option>
            </select>
            <select
              className="form-select mb-3"
              value={newUser.status}
              onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
            >
              <option value="">Select Status</option>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleAdd(false)}>
              Cancel
            </CButton>
            <CButton color="info" onClick={handleAddUser}>
              Save
            </CButton>
          </CModalFooter>
        </CModal>

        <CModal visible={visibleEdit} onClose={() => setVisibleEdit(false)}>
          <CModalHeader>
            <CModalTitle>Edit User</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CFormInput
              placeholder="First Name"
              className="mb-3"
              value={editedUser.firstName}
              onChange={(e) => setEditedUser({ ...editedUser, firstName: e.target.value })}
            />
            <CFormInput
              placeholder="Last Name"
              className="mb-3"
              value={editedUser.lastName}
              onChange={(e) => setEditedUser({ ...editedUser, lastName: e.target.value })}
            />
            <CFormInput
              placeholder="User ID"
              className="mb-3"
              value={editedUser.userId}
              onChange={(e) => setEditedUser({ ...editedUser, userId: e.target.value })}
            />
            <CFormInput
              placeholder="Email"
              className="mb-3"
              value={editedUser.email}
              onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
            />
            <CFormInput
              placeholder="Phone"
              className="mb-3"
              value={editedUser.phone}
              onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })}
            />
            <select
              className="form-select mb-3"
              value={editedUser.role}
              onChange={(e) => setEditedUser({ ...editedUser, role: e.target.value })}
            >
              <option value="">Select Role</option>
              <option value="Tecnico">Técnico</option>
              <option value="Asistente">Asistente</option>
            </select>
            <select
              className="form-select mb-3"
              value={editedUser.status}
              onChange={(e) => setEditedUser({ ...editedUser, status: e.target.value })}
            >
              <option value="">Select Status</option>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleEdit(false)}>
              Cancel
            </CButton>
            <CButton color="info" onClick={handleEditUser}>
              Save
            </CButton>
          </CModalFooter>
        </CModal>

        <CModal visible={visibleDelete} onClose={() => setVisibleDelete(false)}>
          <CModalHeader>
            <CModalTitle>Confirm Delete</CModalTitle>
          </CModalHeader>
          <CModalBody>
            {selectedUser ? (
              <p>
                Are you sure you want to delete the user {selectedUser.firstName}{' '}
                {selectedUser.lastName}
              </p>
            ) : (
              <p>No user selected.</p>
            )}
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleDelete(false)}>
              Cancel
            </CButton>
            <CButton color="danger" onClick={handleDeleteUser}>
              Delete
            </CButton>
          </CModalFooter>
        </CModal>
      </CCardBody>
    </CCard>
  )
}

export default UserList
