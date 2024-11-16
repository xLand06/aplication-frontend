import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

const Login = () => {
  const [visibleResetPassword, setVisibleResetPassword] = useState(false)
  const [visibleSuccessModal, setVisibleSuccessModal] = useState(false)
  const [verificationCode, setVerificationCode] = useState('')
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [step, setStep] = useState(1)

  const handleSendCode = () => {
    console.log(`Código enviado a: ${email}`)
    setStep(2)
  }

  const handleResetPassword = () => {
    console.log(`Nueva contraseña para ${email}: ${newPassword}`)
    setVisibleResetPassword(false)
    setVisibleSuccessModal(true)
    setStep(1)
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-body-secondary">
                      Sign in to your account to start repairing
                    </p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Username" autoComplete="username" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <Link to="/Home">
                          <CButton color="info" className="px-3">
                            Log in
                          </CButton>
                        </Link>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton
                          color="dark"
                          className="px-1"
                          onClick={() => setVisibleResetPassword(true)}
                        >
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-info py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2 className="text-white">Sign up</h2>
                    <p>
                      Sign up and bring your device back to life. Fast and reliable repairs within
                      the reach of a click.
                    </p>
                    <Link to="/register">
                      <CButton color="light" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>

        <CModal
          visible={visibleResetPassword}
          onClose={() => {
            setVisibleResetPassword(false)
            setStep(1)
          }}
        >
          <CModalHeader>
            <CModalTitle>Reset Password</CModalTitle>
          </CModalHeader>
          <CModalBody>
            {step === 1 && (
              <>
                <p>Enter your email to receive a verification code.</p>
                <CFormInput
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mb-3"
                />
                <CButton color="info" onClick={handleSendCode}>
                  Send Verification Code
                </CButton>
              </>
            )}
            {step === 2 && (
              <>
                <p>Enter the verification code and your new password.</p>
                <CFormInput
                  type="text"
                  placeholder="Verification Code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="mb-3"
                />
                <CFormInput
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mb-3"
                />
                <CButton color="info" onClick={handleResetPassword}>
                  Reset Password
                </CButton>
              </>
            )}
          </CModalBody>
          <CModalFooter>
            <CButton
              color="dark"
              onClick={() => {
                setVisibleResetPassword(false)
                setStep(1)
              }}
            >
              Cancel
            </CButton>
          </CModalFooter>
        </CModal>

        <CModal visible={visibleSuccessModal}></CModal>

        <CModal visible={visibleSuccessModal} onClose={() => setVisibleSuccessModal(false)}>
          <CModalHeader>
            <CModalTitle>Password Changed</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <p>Your password has been successfully changed!</p>
          </CModalBody>
          <CModalFooter>
            <CButton color="dark" onClick={() => setVisibleSuccessModal(false)}>
              Close
            </CButton>
          </CModalFooter>
        </CModal>
      </CContainer>
    </div>
  )
}

export default Login
