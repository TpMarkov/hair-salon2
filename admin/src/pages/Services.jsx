import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const Services = () => {

  const { services, getAllServices, backendUrl, adminToken } = useContext(AdminContext)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  useEffect(() => {
    if (adminToken) {
      getAllServices()
    }
  }, [adminToken])

  const deleteService = async (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        const { data } = await axios.post(backendUrl + '/api/service/remove', { id }, { headers: { adminToken } })
        if (data.success) {
          toast.success(data.message)
          getAllServices()
        } else {
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
    }
  }

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentServices = services.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(services.length / itemsPerPage)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div className='w-full p-5'>
      <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-4">
        All <span className="text-amber-600">Services</span>
      </h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 gap-y-6'>
        {currentServices.map((item, index) => (
          <div
            className='border rounded-xl overflow-hidden cursor-pointer group hover:translate-y-[-10px] transition-all duration-500'
            key={index}>
            <div className="relative">
              <img className='bg-blue-50 w-full h-48 object-cover' src={item.image} alt="" />
              <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-red-50"
                onClick={(e) => {
                  e.stopPropagation(); // prevent card click
                  deleteService(item._id)
                }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                  stroke="currentColor" className="w-5 h-5 text-red-500">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              </div>
            </div>
            <div className='p-4'>
              <div className="flex justify-between items-center mb-2">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${item.filter === 'дамско' ? 'bg-pink-100 text-pink-600' : item.filter === 'мъжко' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>{item.filter.toUpperCase()}</span>
                <span className="font-bold text-gray-700">€{item.fee}</span>
              </div>
              <p className='text-gray-900 text-lg font-medium'>{item.type}</p>
              <p className='text-gray-600 text-sm mt-1 line-clamp-2'>{item.shortDescription}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className='flex justify-center items-center gap-2 mt-8'>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 border rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`w-8 h-8 rounded border ${currentPage === i + 1 ? 'bg-yellow-500 text-white' : 'hover:bg-gray-100'}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 border rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}
export default Services
