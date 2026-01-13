import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import { Upload, PlusCircle, Scissors, Tag, FileText, LayoutList } from 'lucide-react';

const ServicesList = () => {
  const { adminToken, backendUrl } = useContext(AdminContext);

  const [serviceImg, setServiceImg] = useState(false);
  const [type, setType] = useState("");
  const [fee, setFee] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [filter, setFilter] = useState("дамско");

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (!serviceImg) {
        return toast.error("Image Not Selected");
      }

      const formData = new FormData();
      formData.append("image", serviceImg);
      formData.append("type", type);
      formData.append("fee", fee);
      formData.append("shortDescription", shortDescription);
      formData.append("description", description);
      formData.append("filter", filter);

      const { data } = await axios.post(
        backendUrl + "/api/service/add-service",
        formData,
        { headers: { adminToken } }
      );

      if (data.success) {
        toast.success(data.message);
        setServiceImg(false);
        setType("");
        setFee("");
        setShortDescription("");
        setDescription("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <div className="w-full bg-gray-50/50 min-h-screen">
      <form
        onSubmit={onSubmitHandler}
        className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8"
      >
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Create <span className="text-amber-600">New Service</span>
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Fill in the details below to add a new hair service to your salon menu.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Image Upload */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 h-full">
              <label className="block text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider">
                Service Image
              </label>

              <div className="relative group">
                <label
                  htmlFor="service-image"
                  className="relative flex flex-col items-center justify-center w-full aspect-square rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 cursor-pointer overflow-hidden transition-all hover:border-amber-400 hover:bg-amber-50/30"
                >
                  {serviceImg ? (
                    <img
                      className="w-full h-full object-cover"
                      src={URL.createObjectURL(serviceImg)}
                      alt="preview"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-6 text-center">
                      <div className="rounded-full bg-amber-100 p-4 mb-4 transition-transform group-hover:scale-110">
                        <Upload className="h-8 w-8 text-amber-600" />
                      </div>
                      <p className="text-sm font-semibold text-gray-900">Click to upload</p>
                      <p className="text-xs text-gray-500 mt-1">SVG, PNG, JPG (max. 2MB)</p>
                    </div>
                  )}

                  {serviceImg && (
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <PlusCircle className="text-white h-10 w-10" />
                    </div>
                  )}
                </label>
                <input
                  onChange={(e) => setServiceImg(e.target.files[0])}
                  type="file"
                  id="service-image"
                  accept="image/*"
                  hidden
                />
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-full bg-emerald-100 p-1">
                    <Tag className="h-3 w-3 text-emerald-600" />
                  </div>
                  <p className="text-xs text-gray-500">Use high-quality images of real work to attract more customers.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form Data */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-6">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Service Name */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 uppercase tracking-wider">
                    <Scissors className="h-4 w-4 text-amber-500" />
                    Service Name
                  </label>
                  <input
                    onChange={(e) => setType(e.target.value)}
                    value={type}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                    type="text"
                    placeholder="e.g. Premium Haircut"
                    required
                  />
                </div>

                {/* Service Price */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 uppercase tracking-wider">
                    <Tag className="h-4 w-4 text-amber-500" />
                    Service Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">$</span>
                    <input
                      onChange={(e) => setFee(e.target.value)}
                      value={fee}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-8 pr-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                      type="number"
                      placeholder="50"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Short Description */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 uppercase tracking-wider">
                  <FileText className="h-4 w-4 text-amber-500" />
                  Short Summary
                </label>
                <input
                  onChange={(e) => setShortDescription(e.target.value)}
                  value={shortDescription}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                  type="text"
                  placeholder="A catchy one-liner for the list view"
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 uppercase tracking-wider">
                  <LayoutList className="h-4 w-4 text-amber-500" />
                  Full Description
                </label>
                <textarea
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all resize-none"
                  placeholder="Explain exactly what is included in this service..."
                  rows={4}
                  required
                />
              </div>

              {/* Filter Category */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 uppercase tracking-wider">
                  <PlusCircle className="h-4 w-4 text-amber-500" />
                  Service Category
                </label>
                <div className="relative">
                  <select
                    onChange={(e) => setFilter(e.target.value)}
                    value={filter}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all appearance-none"
                  >
                    <option value="дамско">Дамско (Women)</option>
                    <option value="мъжко">Мъжко (Men)</option>
                    <option value="детско">Детско (Kids)</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full group relative flex items-center justify-center gap-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold py-4 px-10 rounded-2xl shadow-lg shadow-amber-200 transition-all hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] disabled:opacity-50"
                >
                  <PlusCircle className="h-5 w-5" />
                  Publish Service
                  <div className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
              </div>

            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ServicesList;
