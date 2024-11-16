import React from 'react'
import { UserLists } from './views/pages/users/UserList'
import { element } from 'prop-types'
import { ClientList } from './views/pages/users/ClientList'
import { RepairList } from './views/pages/users/RepairList' //ruta
import { Suppliers } from './views/pages/users/Suppliers'
import { Inventory } from './views/pages/users/Inventory'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const routes = [
  { path: '/dashboard/*', name: 'Dashboard', element: Dashboard },
  { path: '/users', name: 'users', element: UserList },
  { path: '/clients', name: 'clients', element: ClientList },
  { path: '/repairs', name: 'repairs', element: RepairList },
  { path: '/suppliers', name: 'suppliers', element: Suppliers },
  { path: '/inventory', name: 'inventory', element: Inventory },
  { path: '*', exact: true, name: 'Home' },
]
export default routes
