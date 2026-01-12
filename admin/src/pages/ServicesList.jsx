import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";

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
    <form
      onSubmit={onSubmitHandler}
      className="w-full px-4 py-4 sm:px-6 sm:py-6"
    >
      <p className="mb-4 text-xl sm:text-lg font-semibold text-gray-800">
        Add service
      </p>

      <div className="bg-white border rounded-xl w-full max-w-4xl p-4 sm:p-8">
        {/* Image upload */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6 text-gray-500">
          <label
            htmlFor="service-image"
            className="flex flex-col items-center gap-2 cursor-pointer"
          >
            <img
              className="w-20 h-20 object-cover rounded-full border"
              src={
                serviceImg
                  ? URL.createObjectURL(serviceImg)
                  : "/images/image-dropzone.jpg"
              }
              alt="upload-area"
            />
            <span className="text-sm sm:hidden">Tap to upload image</span>
          </label>

          <input
            onChange={(e) => setServiceImg(e.target.files[0])}
            type="file"
            id="service-image"
            hidden
          />

          <p className="hidden sm:block">Upload service image</p>
        </div>

        {/* Form fields */}
        <div className="flex flex-col gap-5 text-gray-700">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Service Name</label>
            <input
              onChange={(e) => setType(e.target.value)}
              value={type}
              className="border rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-primary/30"
              type="text"
              placeholder="Service Name"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Service Price</label>
            <input
              onChange={(e) => setFee(e.target.value)}
              value={fee}
              className="border rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-primary/30"
              type="number"
              placeholder="20"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Short Description</label>
            <input
              onChange={(e) => setShortDescription(e.target.value)}
              value={shortDescription}
              className="border rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-primary/30"
              type="text"
              placeholder="Short summary"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Description</label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              className="border rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="Full service description"
              rows={4}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Filter Category</label>
            <select
              onChange={(e) => setFilter(e.target.value)}
              value={filter}
              className="border rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value="дамско">Дамско</option>
              <option value="мъжко">Мъжко</option>
              <option value="детско">Детско</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="
              bg-primary text-white font-semibold
              w-full sm:w-auto
              py-4 sm:py-3
              rounded-xl
              mt-6
              sm:px-10
              sticky bottom-4
            "
          >
            Add Service
          </button>
        </div>
      </div>
    </form>
  );
};

export default ServicesList;
