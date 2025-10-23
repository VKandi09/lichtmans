import { Routes, Route  } from 'react-router-dom'
import Home from '../components/Home'
import ProductsList from '../pages/ProductsList'
import ProductDetails from '../pages/ProductDetails'
import EventsPage from '../pages/EventsPage'
import AdminLogin from '../admin/AdminLogin'
import ContactUs from '../pages/ContactUs'
import AdminHome from '../admin/AdminHome'

export const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={ <Home />}/>
        <Route path='/products' element={ <ProductsList />}/>
        <Route path='/products/specials' element={ <ProductsList />}/>
        <Route path='/products/wines' element={ <ProductsList />}/>
        <Route path='/products/:id' element={ <ProductDetails />}/>
        <Route path='/events' element={ <EventsPage />}/>
        <Route path='/admin' element={ <AdminLogin />}/>
        <Route path='/contact' element={ <ContactUs />}/>
        <Route path='/admin/dashboard' element={ <AdminHome />}/>
        <Route path='*' element={ <h1 className='text-center text-3xl mt-20'>404 Page Not Found</h1> }/>
    </Routes>
  )
}
