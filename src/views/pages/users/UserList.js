import React from 'react'
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

  const users = [
    {
      firstName: 'Luis',
      lastName: 'Landkoer',
      userId: '31060856',
      email: 'angellandkoer3@gmail.com',
      phone: '04247453502',
      role: 'Tecnico',
      status: 'Activo',
    },
    {
      firstName: 'Ronny',
      lastName: 'Mejia',
      userId: '22510210',
      email: 'ronnymejia30@gmail.com',
      phone: '0424670678',
      role: 'Tecnico',
      status: 'Activo',
    },
  ]

  const filteredUsers = users.filter(() => {
    return (
      user.firstName.toLowerCase().includes(filterName.toLowerCase()) &&
      user.userId.includes(filterId) &&
      user.role.toLowerCase().includes(filterRole.toLowerCase())
    )
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
                placeholder="Filter by ID"
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
              <CButton color="primary" onClick={() => setVisibleAdd(true)}>
                Add User
              </CButton>
            </CCol>
          </CRow>
        </CForm>

        <CTable hover responsive className="mt-4">
          <CTableHead>
            <CTableRow>
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
            {filteredUsers.map((user, index) => (
              <CTableRow key={index}>
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
                      setSelectedUser()
                      setVisibleDelete(false)
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
            <>Add User</>
          </CModalHeader>
          <CModalBody>
            <CFormInput placeholder="First Name" className="mb-3" />
            <CFormInput placeholder="Last Name" className="mb-3" />
            <CFormInput placeholder="User ID" className="mb-3" />
            <CFormInput placeholder="Email" className="mb-3" />
            <CFormInput placeholder="Phone" className="mb-3" />
            <CFormInput placeholder="Role" className="mb-3" />
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleAdd(false)}>
              Cancel
            </CButton>
            <CButton color="primary" onClick={() => {}}>
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
              defaultValue={selectedUser?.firstName}
              className="mb-3"
            />
            <CFormInput
              placeholder="Last Name"
              defaultValue={selectedUser?.lastName}
              className="mb-3"
            />
            <CFormInput
              placeholder="User ID"
              defaultValue={selectedUser?.userId}
              className="mb-3"
            />
            <CFormInput placeholder="Email" defaultValue={selectedUser?.email} className="mb-3" />
            <CFormInput placeholder="Phone" defaultValue={selectedUser?.phone} className="mb-3" />
            <CFormInput placeholder="Role" defaultValue={selectedUser?.role} className="mb-3" />
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleEdit(false)}>
              Cancel
            </CButton>
            <CButton color="primary" onClick={() => setVisibleEdit(false)}>
              Save
            </CButton>
          </CModalFooter>
        </CModal>

        <CModal visible={visibleDelete} onClose={() => setVisibleDelete(false)}>
          <CModalHeader>
            <CModalTitle>Delete User</CModalTitle>
          </CModalHeader>
          <CModalBody>
            Are you sure you want to delete {selectedUser?.firstName} {selectedUser?.lastName}?
          </CModalBody>
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

export default UserList
