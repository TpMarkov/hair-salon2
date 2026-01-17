import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useIsMobile } from "../hooks/use-is-mobile";
import { Pencil, Trash2, X, Save, Clock } from "lucide-react";

const Services = () => {
  const { isMobile } = useIsMobile();

  const { services, getAllServices, backendUrl, adminToken } =
    useContext(AdminContext);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = isMobile ? 4 : 8;

  const [editingService, setEditingService] = useState(null);
  const [editFormData, setEditFormData] = useState({
    type: "",
    fee: "",
    duration: "",
    shortDescription: "",
    description: "",
    filter: "дамско",
  });

  useEffect(() => {
    if (adminToken) {
      getAllServices();
    }
  }, [adminToken]);

  const deleteService = async (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        const { data } = await axios.post(
          backendUrl + "/api/service/remove",
          { id },
          { headers: { adminToken } }
        );
        if (data.success) {
          toast.success(data.message);
          getAllServices();
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const startEditing = (service) => {
    setEditingService(service);
    setEditFormData({
      type: service.type,
      fee: service.fee,
      duration: service.duration || "",
      shortDescription: service.shortDescription,
      description: service.description,
      filter: service.filter,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        backendUrl + "/api/service/update",
        { id: editingService._id, ...editFormData },
        { headers: { adminToken } }
      );

      if (data.success) {
        toast.success(data.message);
        getAllServices();
        setEditingService(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentServices = services.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(services.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="w-full p-5 relative">
      <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-4">
        All <span className="text-amber-600">Services</span>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 gap-y-6">
        {currentServices.map((item, index) => (
          <div
            className="border rounded-xl overflow-hidden cursor-pointer group hover:translate-y-[-10px] transition-all duration-500 bg-white shadow-sm hover:shadow-xl"
            key={index}
          >
            <div className="relative">
              <img
                className="bg-blue-50 w-full h-48 object-cover"
                src={item.image}
                alt=""
              />
              {import.meta.env.VITE_APP_BUNDLE !== 'STANDARD' && (
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    className="bg-white rounded-full p-2 shadow hover:bg-amber-50 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      startEditing(item);
                    }}
                  >
                    <Pencil className="w-4 h-4 text-amber-500" />
                  </button>
                  <button
                    className="bg-white rounded-full p-2 shadow hover:bg-red-50 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteService(item._id);
                    }}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${item.filter === "дамско"
                    ? "bg-pink-100 text-pink-600"
                    : item.filter === "мъжко"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-green-100 text-green-600"
                    }`}
                >
                  {item.filter.toUpperCase()}
                </span>
                <span className="font-bold text-gray-700">€{item.fee}</span>
              </div>
              <p className="text-gray-900 text-lg font-medium">{item.type}</p>
              <div className="flex items-center gap-1 text-xs text-gray-400 mt-1 mb-2">
                <Clock className="w-3 h-3" />
                <span>{item.duration || 30} min</span>
              </div>
              <p className="text-gray-600 text-sm line-clamp-2">
                {item.shortDescription}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 border rounded ${currentPage === 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-100"
              }`}
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`w-8 h-8 rounded border ${currentPage === i + 1
                ? "bg-amber-500 text-white border-amber-500"
                : "hover:bg-gray-100"
                }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 border rounded ${currentPage === totalPages
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-100"
              }`}
          >
            Next
          </button>
        </div>
      )}

      {/* Edit Modal (Simple Overlay) */}
      {editingService && (
        <div className="fixed inset-0 bg-black/50 z-1000 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-xl font-bold text-gray-800">Edit Service</h2>
              <button
                onClick={() => setEditingService(null)}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              <form onSubmit={handleUpdate} className="space-y-4">
                {/* Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service Name</label>
                  <input
                    type="text"
                    value={editFormData.type}
                    onChange={(e) => setEditFormData({ ...editFormData, type: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                    required
                  />
                </div>

                {/* Price and Duration */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price (€)</label>
                    <input
                      type="number"
                      value={editFormData.fee}
                      onChange={(e) => setEditFormData({ ...editFormData, fee: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration (min)</label>
                    <input
                      type="number"
                      value={editFormData.duration}
                      onChange={(e) => setEditFormData({ ...editFormData, duration: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                      required
                    />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={editFormData.filter}
                    onChange={(e) => setEditFormData({ ...editFormData, filter: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none bg-white"
                  >
                    <option value="дамско">Дамско (Women)</option>
                    <option value="мъжко">Мъжко (Men)</option>
                    <option value="детско">Детско (Kids)</option>
                  </select>
                </div>

                {/* Short Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
                  <input
                    type="text"
                    value={editFormData.shortDescription}
                    onChange={(e) => setEditFormData({ ...editFormData, shortDescription: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                    required
                  />
                </div>

                {/* Full Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Description</label>
                  <textarea
                    value={editFormData.description}
                    onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none resize-none h-24"
                    required
                  />
                </div>

                <div className="pt-4 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingService(null)}
                    className="px-4 py-2 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-amber-500 text-white font-medium rounded-lg hover:bg-amber-600 transition-colors shadow-lg shadow-amber-500/30 flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Services;
