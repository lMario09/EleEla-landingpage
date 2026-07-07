import { createBrowserRouter } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Admin from './pages/Admin'
import Booking from './pages/Booking'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
    ],
  },
  {
    path: '/admin',
    element: <Admin />,
  },
  {
    path: '/agendamento',
    element: <Booking />,
  },
])

export default router
