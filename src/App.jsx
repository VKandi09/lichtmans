import { useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { AllRoutes } from './routes/AllRoutes';
// import { AdminRoutes } from './routes/AdminRoutes';

function App() {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith('/admin');
  return (
    <div className='flex flex-col min-h-screen'>
      { !isAdminRoute && <Header />}
      <main className={`flex-1 ${!isAdminRoute ? 'mt-[64px]' : ''}`}>
        <AllRoutes />
      </main>
      { !isAdminRoute && <Footer /> }
      {/* <AdminRoutes /> */}
    </div>
  )
}

export default App
