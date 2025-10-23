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
    <div className="bg-white p-8 rounded shadow w-1/2 mx-auto">
      <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
      <div className="space-y-3">
        {Object.keys(form).map((key) => {
          if (key !== "special") {
            return (
              <div key={key} className="flex items-center gap-2">
                <label className="w-28 text-gray-700 font-medium capitalize">
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
                  className="border w-full p-2 rounded"
                />
              </div>
            );
          } else {
            return (
              <label key={key} className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  checked={form.special}
                  onChange={handleChange}
                  name="special"
                />
                Special
              </label>
            );
          }
        })}
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white px-4 py-2 mt-4 rounded hover:bg-green-700 cursor-pointer"
        >
          Add Product
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
