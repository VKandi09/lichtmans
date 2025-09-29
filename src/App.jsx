import Header from './components/Header';
import Footer from './components/Footer';
import { AllRoutes } from './routes/AllRoutes';

function App() {

  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-1 mt-[64px]'>
        <AllRoutes />
      </main>
      <Footer />
    </div>
  )
}

export default App
