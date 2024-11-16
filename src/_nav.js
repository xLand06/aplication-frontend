import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cibPaypal,
  cilBell,
  cilCalculator,
  cilChart,
  cilChartPie,
  cilClipboard,
  cilCog,
  cilCreditCard,
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
    to: 'Dashboard',
    icon: <CIcon icon={cilChart} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'STATISTICS',
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
    to: 'Repairs',
    icon: <CIcon icon={cilCog} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Payments',
    to: 'Payments',
    icon: <CIcon icon={cilCreditCard} customClassName="nav-icon" />,
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
]

export default _nav
