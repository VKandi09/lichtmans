import Featured from './Featured';
import Hero from './Hero';


const Home = () => {
  return (
    <div className='min-h-screen flex flex-col justify-between'>
        <main className='flex-1'>
            <Hero />
            <Featured />
        </main>
    </div>
  )
}

export default Home