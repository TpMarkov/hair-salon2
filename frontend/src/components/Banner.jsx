const Banner = () => {
  return (
    <div className="relative overflow-hidden bg-black/60 w-[calc(100%+2.5rem)] mx-[-1.25rem] my-24 group">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-0" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between pl-[1.25rem]">
        {/* Left Side: Content */}
        <div className="flex-1 py-12 px-8 sm:px-12 md:py-20 lg:py-28 lg:pl-16">
          <div className="max-w-xl space-y-6">
            <h2 className="text-gold text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              Запази час за <br className="hidden sm:block" />
              <span className="text-white">съвършена визия</span>
            </h2>
            <p className="text-gray-300 text-lg md:text-xl max-w-md leading-relaxed">
              Присъедини се към нашите доволни клиенти и се възползвай от
              професионална грижа за твоята коса.
            </p>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="hidden lg:flex items-center gap-7 bg-white/5 backdrop-blur-md p-6 rounded-[2.5rem] border border-white/10 shadow-2xl">
                <div className="bg-white p-3 rounded-2xl shadow-xl transform transition-transform duration-300 hover:scale-[1.02]">
                  <img
                    src="/images/qr-code.png"
                    alt="Scan to download"
                    className="w-24 h-24 md:w-32 md:h-32 object-contain aspect-square image-rendering-auto"
                  />
                </div>
                <p className="text-gray-200 text-lg font-bold leading-snug max-w-[200px]">
                  Сканирай QR кода за да изтеглиш приложението на мобилното си
                  устройство
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="w-full md:w-1/2 relative h-[300px] md:h-auto self-stretch">
          <img
            src="/compressed/banner-refined.png"
            alt="Premium Hair Salon"
            className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
          />
          {/* Overlay to blend image with content */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent md:block hidden" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent md:hidden block" />
        </div>
      </div>
    </div>
  );
};

export default Banner;
