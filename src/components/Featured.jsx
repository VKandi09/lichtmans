import { useEffect, useState } from "react";

const Featured = () => {
  const [types, setTypes] = useState([]);

  function capitalizeWords(str) {
    return str
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/products/types");
        if (!response.ok) throw new Error("Failed to fetch product types");
        const data = await response.json();
        const capitalizedData = data.map(type => capitalizeWords(type));
        setTypes(capitalizedData);
      } catch (error) {
        console.error("Error fetching product types:", error);
      }
    };
    fetchTypes();
  }, []);

  return (
    <section className="py-22 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-start text-gray-800 mb-8">Featured Products</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {types.map((item, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow hover:shadow-lg transition duration-300 border border-gray-200 p-4 flex flex-col items-center cursor-pointer"
            >
              <img 
                src={'/images/dalmore-cigar-malt.png'} 
                alt={item} 
                className="h-40 w-40 object-contain mb-3"
              />
              <h2 className="text-md font-semibold text-gray-700 text-center">{item}</h2>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Featured;
