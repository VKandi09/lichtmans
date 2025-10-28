import { useState, useEffect } from "react";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import { API_BASE } from '../api';

const ContactUs = () => {
  const [contact, setContact] = useState(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/contact`);
        const data = await res.json();
        setContact(data);
      } catch (err) {
        console.error("Error fetching contact details:", err);
      }
    };
    fetchContact();
  }, []);

  return (
    <div className="flex flex-col items-center max-h-screen p-4 sm:p-6 mt-10 sm:mt-10">
      <h1 className="text-3xl font-semibold mb-8 text-rose-800">Contact Us</h1>
      {contact ? (
        <div className="bg-white border border-gray-300 shadow rounded-2xl p-8 w-full max-w-3xl space-y-6 hover:shadow-lg transition-shadow duration-300">
          {/* Phone */}
          <div className="flex items-center space-x-4">
            <FiPhone className="text-rose-800 text-2xl" />
            <div>
              <h2 className="font-medium text-lg text-gray-700">Phone</h2>
              <p className="text-gray-600">{contact.phone}</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center space-x-4">
            <FiMail className="text-rose-800 text-2xl" />
            <div>
              <h2 className="font-medium text-lg text-gray-700">Email</h2>
              <p className="text-gray-600">{contact.email}</p>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-center space-x-4">
            <FiMapPin className="text-rose-800 text-2xl" />
            <div>
              <h2 className="font-medium text-lg text-gray-700">Address</h2>
              <p className="text-gray-600">{contact.address}</p>
            </div>
          </div>
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d336.70400896540093!2d-75.20880435243042!3d43.11436798186807!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d9477480720b73%3A0xfdb93afa32d2b173!2sLichtman&#39;s%20Wine%20%26%20Liquor%20Store!5e1!3m2!1sen!2sus!4v1761237410040!5m2!1sen!2sus"
            width="100%"
            height="300"
            allowFullScreen=""
            loading="lazy"
            className="rounded-2xl shadow-md mt-6"
          />
        </div>
      ) : (
        <p className="text-gray-500">Loading contact details...</p>
      )}
    </div>
  );
};

export default ContactUs;
