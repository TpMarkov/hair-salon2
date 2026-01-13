import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const ServicesMenu = () => {
  const { latestServices } = useContext(AppContext);
  const navigate = useNavigate();

  // Function to optimize Cloudinary image URLs
  const optimizeImageUrl = (url) => {
    if (!url || !url.includes("cloudinary.com")) return url;
    // Add q_auto (quality), f_auto (format), and w_800 (width) for optimization
    return url.replace("/upload/", "/upload/q_auto,f_auto,w_800/");
  };

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-gold text-4xl md:text-5xl font-bold mb-4">
          Най-популярни фризьорски услуги в Ловеч
        </h2>

        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Открий най-търсените фризьорски услуги в Ловеч – подстригване,
          боядисване и терапии за коса.
        </p>
      </div>

      {latestServices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {latestServices.map((service, index) => (
            <div
              onClick={() => navigate(`/service/${service.type}`)}
              key={service.serviceId || index}
              className="group relative cursor-pointer"
            >
              <div className="overflow-hidden rounded-2xl aspect-[4/5] mb-6 shadow-2xl transition-all duration-500 group-hover:shadow-gold/20 group-hover:-translate-y-2">
                <img
                  src={optimizeImageUrl(service.image)}
                  alt={`${service.type} в Ловеч – фризьорски салон`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <span className="text-gold font-medium">Научи повече →</span>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-gold text-xl font-semibold transition-colors duration-300">
                  {service.type}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Времетраене: ~45 мин</span>
                  <span className="text-gold font-bold text-lg">
                    {service.fee}€
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gold text-xl italic">
            Моля добавете нова услуга от администраторския панел
          </p>
        </div>
      )}
    </section>
  );
};
export default ServicesMenu;
