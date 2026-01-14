// import { DownloadIcon } from "lucide-react";
// import { AppContext } from "../context/AppContext.jsx";

// const Banner = () => {
//   const APP_URL = "https://hair-salon-frontend-rho.vercel.app/app-release.apk";

//   const downlaodFileAtUrl = async (url) => {
//     const response = await fetch(url);
//     const blob = await response.blob();

//     const blobUrl = window.URL.createObjectURL(blob);
//     const aTag = document.createElement("a");

//     aTag.href = blobUrl;
//     aTag.download = "app-release.apk";
//     document.body.appendChild(aTag);

//     aTag.click();

//     aTag.remove();
//     window.URL.revokeObjectURL(blobUrl);
//   };

//   return (
//     <div
//       className="relative overflow-hidden rounded-3xl bg-black/40 border border-white/5 shadow-2xl my-20 mx-4 md:mx-10 group">
//       {/* Background Gradient */}
//       <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-0" />

//       <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
//         {/* Left Side: Content */}
//         <div className="flex-1 py-12 px-8 sm:px-12 md:py-20 lg:py-28 lg:pl-16">
//           <div className="max-w-xl space-y-6">
//             <h2 className="text-gold text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
//               Запази час за <br className="hidden sm:block" />
//               <span className="text-white">съвършена визия</span>
//             </h2>
//             <p className="text-gray-300 text-lg md:text-xl max-w-md leading-relaxed">
//               Присъедини се към нашите доволни клиенти и се възползвай от
//               професионална грижа за твоята коса.
//             </p>
//             {/*{!userData && (*/}
//             <div className="flex flex-col md:flex-row items-center gap-6">
//               <button
//                 onClick={() => downlaodFileAtUrl(APP_URL)}
//                 className="md:hidden group flex items-center gap-3 bg-primary-gradient px-8 py-4 rounded-full text-white font-bold text-lg shadow-lg hover:shadow-amber-500/30 transition-all active:scale-95 cursor-pointer w-full sm:w-auto justify-center"
//               >
//                 <DownloadIcon size={24} />
//                 <span>Изтегли приложението</span>
//               </button>

//               <div className="hidden md:flex items-center gap-7 bg-white/5 backdrop-blur-md p-6 rounded-[2.5rem] border border-white/10 shadow-2xl">
//                 <div className="bg-white p-3 rounded-2xl shadow-xl transform transition-transform duration-300 hover:scale-[1.02]">
//                   <img
//                     src="/images/qr.png"
//                     alt="Scan to download"
//                     className="w-24 h-24 md:w-32 md:h-32 object-contain aspect-square image-rendering-auto"
//                   />
//                 </div>
//                 <p className="text-gray-200 text-lg font-bold leading-snug max-w-[200px]">
//                   Сканирай QR кода за да изтеглиш приложението на мобилното си устройство
//                 </p>
//               </div>
//             </div>
//             ){/*}*/}
//           </div>
//         </div>

//         {/* Right Side: Image */}
//         <div className="w-full md:w-1/2 relative h-[300px] md:h-auto self-stretch">
//           <img
//             src="/images/banner-refined.png"
//             alt="Premium Hair Salon"
//             className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
//           />
//           {/* Overlay to blend image with content */}
//           <div
//             className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent md:block hidden" />
//           <div
//             className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent md:hidden block" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Banner;

import { DownloadIcon } from "lucide-react";

const Banner = () => {
  const APP_URL =
    "https://hair-salon-frontend-rho.vercel.app/app-release.apk";

  /* -------------------------
     Environment Detection
  -------------------------- */

  const isBrowser = typeof window !== "undefined";

  const userAgent = isBrowser ? navigator.userAgent : "";

  const isAndroid = /Android/i.test(userAgent);
  const isIOS = /iPhone|iPad|iPod/i.test(userAgent);

  const isMobile =
    isAndroid ||
    isIOS ||
    (isBrowser && navigator.maxTouchPoints > 1);

  /**
   * BEST PRACTICE:
   * Inject a custom identifier in your Android WebView:
   * "HairSalonApp"
   */
  const isInAndroidApp = /HairSalonApp/i.test(userAgent);

  /* -------------------------
     Download Handler
  -------------------------- */

  const downloadFile = () => {
    /**
     * Best practice for APK downloads:
     * - Let the browser handle it
     * - Avoid fetch/blob (large files, memory pressure)
     */
    const link = document.createElement("a");
    link.href = APP_URL;
    link.download = "hair-salon-app.apk";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  /* -------------------------
     Conditional Rendering
  -------------------------- */

  const showDownloadButton =
    isMobile && isAndroid && !isInAndroidApp;

  const showQRCode =
    !isMobile || isIOS;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-black/40 border border-white/5 shadow-2xl my-20 mx-4 md:mx-10 group">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-0" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
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
              {/* Mobile Android Browser → Download Button */}
              {showDownloadButton && (
                <button
                  onClick={downloadFile}
                  className="md:hidden group flex items-center gap-3 bg-primary-gradient px-8 py-4 rounded-full text-white font-bold text-lg shadow-lg hover:shadow-amber-500/30 transition-all active:scale-95 cursor-pointer w-full sm:w-auto justify-center"
                >
                  <DownloadIcon size={24} />
                  <span>Изтегли приложението</span>
                </button>
              )}

              {/* Desktop / iOS → QR Code */}
              {showQRCode && (
                <div className="hidden md:flex items-center gap-7 bg-white/5 backdrop-blur-md p-6 rounded-[2.5rem] border border-white/10 shadow-2xl">
                  <div className="bg-white p-3 rounded-2xl shadow-xl transform transition-transform duration-300 hover:scale-[1.02]">
                    <img
                      src="/images/qr.png"
                      alt="Scan to download"
                      className="w-24 h-24 md:w-32 md:h-32 object-contain aspect-square"
                    />
                  </div>
                  <p className="text-gray-200 text-lg font-bold leading-snug max-w-[200px]">
                    Сканирай QR кода за да изтеглиш приложението на мобилното си
                    устройство
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="w-full md:w-1/2 relative h-[300px] md:h-auto self-stretch">
          <img
            src="/images/banner-refined.png"
            alt="Premium Hair Salon"
            className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent md:block hidden" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent md:hidden block" />
        </div>
      </div>
    </div>
  );
};

export default Banner;

