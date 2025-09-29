const Hero = () => {
  return (
    <section className="h-screen bg-fixed bg-center bg-cover flex flex-col justify-center items-center text-white" 
      style={{ backgroundImage: "url('/images/image1.jpg')" }}>
      <div className='bg-black/80 p-10 rounded-lg text-center max-w-3xl'>
          <h1 className="text-5xl font-bold mb-6">
            Lichtman's Wine & Liquor Store
          </h1>
          <p className="text-lg leading-relaxed">
            At <span className="text-red-400 font-semibold">Lichtman's Wine & Liquor Store</span>, we believe every occasion deserves the perfect drink. From fine wines and premium spirits to 
            local craft beers and unique mixers, our shelves are stocked with a wide selection to suit every taste and budget. 
            Whether you’re planning a celebration, stocking up for the weekend, or looking for the perfect gift, our friendly 
            team is here to help you find just what you need. With a commitment to quality, value, and exceptional service, we 
            make shopping for your favorite beverages simple and enjoyable. Cheers to great times, great taste, and great 
            company – all starting here at <span className="font-bold">Lichtman's Wine & Liquor Store</span>.
          </p>
      </div>
    </section>
  )
}

export default Hero
