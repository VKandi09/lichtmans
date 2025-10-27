import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BASE_URL = "http://localhost:5001/api/products";

const AddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    type: "",
    subType: "",
    description: "",
    brand: "",
    price: "",
    quantity: "",
    stock: "",
    image: "",
    special: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to add product");
      toast.success("Product added successfully!");    
        setForm({
        name: "",
        type: "",
        description: "",
        brand: "",
        special: false,
        price: "",
        quantity: "",
        stock: "",
        image: "",
        subType: "",
      });
    } catch (error) {
      toast.error(error.message || "Failed to add product."); 
    }
  };

  return (
    <div className="bg-white p-4 sm:p-6 md:p-8 rounded shadow w-full max-w-full sm:max-w-2xl lg:max-w-3xl mx-auto">
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 sm:mb-6">Add New Product</h2>
      <div className="space-y-3 sm:space-y-4">
        {Object.keys(form).map((key) => {
          if (key !== "special") {
            return (
              <div key={key} className="flex flex-col sm:flex-row sm:items-center gap-2">
                <label className="w-full sm:w-32 md:w-36 text-gray-700 font-medium capitalize text-sm sm:text-base">
                  {key}
                </label>
                <input
                  name={key}
                  value={form[key]}
                  onChange={handleChange}
                  placeholder={key}
                  type={
                    key === "price" || key === "stock" || key === "quantity"
                      ? "number"
                      : "text"
                  }
                  className="border w-full p-2 sm:p-2.5 rounded text-sm sm:text-base focus:ring-2 focus:ring-rose-800 focus:outline-none"
                />
              </div>
            );
          } else {
            return (
              <label key={key} className="flex items-center gap-2 mt-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.special}
                  onChange={handleChange}
                  name="special"
                  className="w-4 h-4 accent-rose-800"
                />
                <span className="text-sm sm:text-base">Special</span>
              </label>
            );
          }
        })}
      </div>
      <div className="flex justify-end mt-4 sm:mt-6">
        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded hover:bg-green-700 transition-colors cursor-pointer text-sm sm:text-base w-full sm:w-auto"
        >
          Add Product
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
