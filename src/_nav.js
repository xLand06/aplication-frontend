import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilClipboard,
  cilCog,
  cilCursor,
  cilDescription,
  cilDrop,
  cilHome,
  cilMobile,
  cilNotes,
  cilPencil,
  cilPeople,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilStarHalf,
  cilStorage,
  cilUser,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'Statitics',
    },
  },
  {
    component: CNavTitle,
    name: 'Modules',
  },
  {
    component: CNavItem,
    name: 'Users',
    to: 'Users',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Clients',
    to: 'Clients',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Repairs',
    to: '/',
    icon: <CIcon icon={cilCog} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Suppliers',
    to: 'Suppliers',
    icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Inventory',
    to: 'Inventory',
    icon: <CIcon icon={cilMobile} customClassName="nav-icon" />,
  },

  {
    component: CNavTitle,
    name: 'Extras',
  },

  {
    component: CNavGroup,
    name: 'Pages',
    icon: <CIcon icon={cilStarHalf} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Login',
        to: '/login',
      },
      {
        component: CNavItem,
        name: 'Register',
        to: '/register',
      },
    ],
  },
]

export default _nav
