import { useState, useEffect } from "react";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";

const ContactUs = () => {
  const [contact, setContact] = useState(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/contact");
        const data = await res.json();
        setContact(data);
      } catch (err) {
        console.error("Error fetching contact details:", err);
      }
    };
    fetchContact();
  }, []);

  return (
    <div className="flex flex-col items-center max-h-screen p-15">
      <h1 className="text-3xl font-semibold mb-8 text-gray-800">Contact Us</h1>
      {contact ? (
        <div className="bg-white shadow rounded-2xl p-8 w-full max-w-lg space-y-6 hover:shadow-lg transition-shadow duration-300">
          {/* Phone */}
          <div className="flex items-center space-x-4">
            <FiPhone className="text-red-800 text-2xl" />
            <div>
              <h2 className="font-medium text-lg text-gray-700">Phone</h2>
              <p className="text-gray-600">{contact.phone}</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center space-x-4">
            <FiMail className="text-red-800 text-2xl" />
            <div>
              <h2 className="font-medium text-lg text-gray-700">Email</h2>
              <p className="text-gray-600">{contact.email}</p>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-center space-x-4">
            <FiMapPin className="text-red-800 text-2xl" />
            <div>
              <h2 className="font-medium text-lg text-gray-700">Address</h2>
              <p className="text-gray-600">
                {contact.address}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">Loading contact details...</p>
      )}
    </div>
  );
  // return (
  //   <div className="bg-gray-200 max-w-3xl mx-auto mt-24 p-6 shadow rounded-lg">
  //     <h2 className="text-2xl font-bold mb-4 text-center text-red-800">Contact Us</h2>
  //     {contact ? (
  //       <div className="text-center space-y-3">
  //         <p><span className="font-semibold">Phone:</span> {contact.phone}</p>
  //         <p><span className="font-semibold">Email:</span> {contact.email}</p>
  //         <p><span className="font-semibold">Address:</span> {contact.address}</p>
  //       </div>
  //     ) : (
  //       <p className="text-center text-gray-600">Loading contact details...</p>
  //     )}
  //   </div>
  // );
};

export default ContactUs;
