import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import EditProduct from "./EditProduct";
import { FiChevronLeft, FiChevronRight, FiEdit } from "react-icons/fi";


const BASE_URL = "http://localhost:5001/api/products";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const fetchProducts = async () => {
    const res = await fetch(BASE_URL);
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;
  const currentProducts = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / perPage);

  // Reset page to 1 when perPage changes
  const handlePerPageChange = (e) => {
    setPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <>
      <div className="flex items-center justify-center mb-4 gap-4">
        {/* Make search bar take full remaining width */}
        <div className="flex-1">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search product..."
          />
        </div>

        {/* Per page selector */}
        <div className="flex-shrink-0">
          <label className="mr-1">Show:</label>
          <select
            value={perPage}
            onChange={handlePerPageChange}
            className="border rounded p-1"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
          </select>
        </div>
      </div>

      {/* Product list */}
      <table className="w-full borderborder-gray-300 bg-white shadow">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Quantity</th>
            <th className="p-2 border">Stock</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((p) => (
            <tr key={p._id} className="text-center hover:bg-gray-50">
              <td className="border p-2">{p.name}</td>
              <td className="border p-2">${p.price}</td>
              <td className="border p-2">{p.quantity}</td>
              <td className="border p-2">{p.stock}</td>
              <td className="border p-2">
                <button
                  onClick={() => setEditingProduct(p)}
                  className="hover:bg-gray-400 px-3 py-1 rounded mr-2"
                >
                  <FiEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination buttons */}
      <div className="flex justify-center gap-2 mt-3">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded"
        >
          <FiChevronLeft className="" />
        </button>
        {/* Page number buttons */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => setCurrentPage(num)}
            className={`px-3 py-1 border rounded ${
              currentPage === num ? "bg-gray-300 font-bold" : ""
            }`}
          >
            {num}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded"
        >
          <FiChevronRight />
        </button>
      </div>

      {editingProduct && (
        <EditProduct
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          refresh={fetchProducts}
        />
      )}
    </>
  );
};

export default ProductList;
