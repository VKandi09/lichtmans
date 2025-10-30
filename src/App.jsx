import { useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { AllRoutes } from './routes/AllRoutes';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith('/admin');
  return (
    <div className='flex flex-col min-h-screen'>
      <ScrollToTop />
      { !isAdminRoute && <Header />}
      <main className={`flex-1 ${!isAdminRoute ? 'mt-[64px]' : ''}`}>
        <AllRoutes />
      </main>
      { !isAdminRoute && <Footer /> }
    </div>
  )
}

export default App
