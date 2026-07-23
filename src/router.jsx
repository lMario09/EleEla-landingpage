import { createBrowserRouter } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Admin from './pages/Admin'

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
])

export default router
