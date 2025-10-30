import { useState, useEffect } from "react";
import EditOffer from "./EditOffer";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { API_BASE } from '../api';

const BASE_URL = `${API_BASE}/api/offers`;

const OffersList = () => {
  const [offers, setOffers] = useState([]);
  const [editingOffer, setEditingOffer] = useState(null);

  const fetchOffers = async () => {
    const res = await fetch(BASE_URL);
    const data = await res.json();
    setOffers(data);
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this offer?")) return;
    await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
    fetchOffers();
    alert("Offer deleted successfully!");
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4">List of Offers</h2>
      
      {/* Desktop Table View - Hidden on mobile */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border bg-white shadow">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Description</th>
              <th className="p-2 border">Badge</th>
              <th className="p-2 border">Valid Until</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((offer) => (
              <tr key={offer._id} className="text-center">
                <td className="border p-2">{offer.title}</td>
                {/* <td className="border p-2">
                  {new Date(event.date).toLocaleDateString()}
                </td> */}
                <td className="border p-2">{offer.description || "-"}</td>
                <td className="border p-2">{offer.badge || "-"}</td>
                <td className="border p-2">{offer.validUntil || "-"}</td>
                <td className="border p-2">
                  <button
                    onClick={() => setEditingOffer(offer)}
                    className="hover:bg-gray-400 px-3 py-1 rounded mr-2"
                    aria-label="Edit offer"
                  >
                    <FiEdit className="text-gray-700"/>
                  </button>
                  <button
                    onClick={() => handleDelete(offer._id)}
                    className="hover:bg-gray-400 px-3 py-1 rounded"
                    aria-label="Delete offer"
                  >
                    <FiTrash2 className="text-red-600"/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View - Hidden on desktop */}
      <div className="md:hidden space-y-4">
        {offers.map((offer) => (
          <div key={offer._id} className="bg-white shadow rounded-lg p-4 border">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold text-lg">{offer.title}</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingOffer(offer)}
                  className="hover:bg-gray-200 p-2 rounded"
                  aria-label="Edit offer"
                >
                  <FiEdit className="text-gray-700" />
                </button>
                <button
                  onClick={() => handleDelete(offer._id)}
                  className="hover:bg-gray-200 p-2 rounded"
                  aria-label="Delete offer"
                >
                  <FiTrash2 className="text-red-600" />
                </button>
              </div>
            </div>
            
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex">
                <span className="font-medium w-20">Valid until:</span>
                <span>{new Date(offer.validUntil).toLocaleDateString()}</span>
              </div>
              <div className="flex">
                <span className="font-medium w-20">Badge</span>
                <span>{offer.badge || "-"}</span>
              </div>
              {/* <div className="flex">
                <span className="font-medium w-20">Location:</span>
                <span>{event.location || "-"}</span>
              </div> */}
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {offers.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          No offers available
        </div>
      )}

      {editingOffer && (
        <EditOffer
          offer={editingOffer}
          onClose={() => setEditingOffer(null)}
          refresh={fetchOffers}
        />
      )}
    </div>
  );
};

export default OffersList;