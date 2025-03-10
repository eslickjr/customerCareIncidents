import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App.js'
import CustomerCareIncidents from './pages/CustomerCareIncidents.js'
import NoAccount from './pages/NoAccount.js'
import CustomerAccount from './pages/CustomerAccount.js'
import UserStats from './pages/UserStats.js'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className='display-2'>Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <CustomerCareIncidents />
      }, {
        path: '/noAccount/:customerId',
        element: <NoAccount />
      }, {
        path: '/customerAccount/:loanId',
        element: <CustomerAccount />
      }, {
        path: '/userStats',
        element: <UserStats />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
