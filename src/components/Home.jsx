import BestSellers from './BestSellers';
import Featured from './Featured';
import Hero from './Hero';
import NewArrivals from './NewArrivals';


const Home = () => {
  return (
    <div className='min-h-screen flex flex-col justify-between'>
        <main className='flex-1'>
            <Hero />
            <Featured />
            {/* <NewArrivals />
            <BestSellers /> */}
        </main>
    </div>
  )
}

export default Home