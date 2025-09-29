import { Routes, Route  } from 'react-router-dom'
import Home from '../components/Home'
import ProductsList from '../pages/ProductsList'
import ProductDetails from '../pages/ProductDetails'

export const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={ <Home />}/>
        <Route path='/products' element={ <ProductsList />}/>
        <Route path='/products/:id' element={ <ProductDetails />}/>
    </Routes>
  )
}
