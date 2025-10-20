import { Routes, Route  } from 'react-router-dom';
import AdminLogin from '../pages/AdminLogin';
import AdminDashboard from '../pages/AdminDashboard';

export const AdminRoutes = () => {
  return (
    <Routes>
        <Route path='/admin' element={ <AdminLogin />}/>
        <Route path='/admin/dashboard' element={ <AdminDashboard />}/>
        <Route path='*' element={ <h1 className='text-center text-3xl mt-20'>404 Page Not Found</h1> }/>
    </Routes>
  )
}