import React, { Suspense } from 'react'
import { UserList } from './views/pages/users/UserList'
import { ClientList } from './views/pages/users/ClientList'
import { RepairList } from './views/pages/users/RepairList'
import { Suppliers } from './views/pages/users/Suppliers'
import { Inventory } from './views/pages/users/Inventory'
import Payments from './views/pages/users/Payments'
import { element } from 'prop-types'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const routes = [
  { path: '/dashboard', exact: true, name: 'dashboard' },

  { path: '/users', name: 'users', element: UserList },
  { path: '/clients', name: 'clients', element: ClientList },
  { path: '/repairs', name: 'repairs', element: RepairList },
  { path: '/suppliers', name: 'suppliers', element: Suppliers },
  { path: '/inventory', name: 'inventory', element: Inventory },
  { path: '/payments', name: 'payments', element: Payments },
  { path: '/dashboard', name: 'dashboard', element: Dashboard },
]

export default routes
