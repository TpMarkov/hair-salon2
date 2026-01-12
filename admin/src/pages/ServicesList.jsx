import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext.jsx";
import { assets } from "../assets/assets.js";
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
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add service</p>

      <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll scrollbar-hiden">
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="service-image">
            <img
              className="w-16 bg-transparent rounded-full cursor-pointer"
              src={
                serviceImg
                  ? URL.createObjectURL(serviceImg)
                  : "/images/image-dropzone.jpg"
              }
              alt="upload-area"
            />
          </label>
          <input
            onChange={(e) => setServiceImg(e.target.files[0])}
            type="file"
            id="service-image"
            hidden
          />
          <p>Upload service image</p>
        </div>

        <div className="flex flex-col gap-4 text-gray-600">
          <div className="flex flex-col gap-1">
            <p>Service Name</p>
            <input
              onChange={(e) => setType(e.target.value)}
              value={type}
              className="border rounded px-3 py-2"
              type="text"
              placeholder="Service Name"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <p>Service Price</p>
            <input
              onChange={(e) => setFee(e.target.value)}
              value={fee}
              className="border rounded px-3 py-2"
              type="number"
              placeholder="20"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <p>Short Description</p>
            <input
              onChange={(e) => setShortDescription(e.target.value)}
              value={shortDescription}
              className="border rounded px-3 py-2"
              type="text"
              placeholder="Short summary"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <p>Description</p>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              className="border rounded px-3 py-2"
              placeholder="Full service description"
              rows={4}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <p>Filter Category</p>
            <select
              onChange={(e) => setFilter(e.target.value)}
              value={filter}
              className="border rounded px-3 py-2"
            >
              <option value="дамско">Дамско</option>
              <option value="мъжко">Мъжко</option>
              <option value="детско">Детско</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-primary px-10 py-3 mt-4 text-white rounded-full"
          >
            Add Service
          </button>
        </div>
      </div>
    </form>
  );
};

export default ServicesList;
