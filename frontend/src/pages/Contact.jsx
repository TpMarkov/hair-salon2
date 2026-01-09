import React, {useEffect, useRef} from 'react';
import {useNavigate} from "react-router-dom";
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 1024px)",
      isMobile: "(max-width: 1023px)"
    }, (context) => {
      let {isDesktop} = context.conditions;

      // Title animation
      gsap.from(titleRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });

      // Image animation
      gsap.from(imageRef.current, {
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 85%",
        },
        x: isDesktop ? -50 : 0,
        y: isDesktop ? 0 : 30,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out"
      });

      // Info animation
      gsap.from(infoRef.current, {
        scrollTrigger: {
          trigger: infoRef.current,
          start: "top 85%",
        },
        x: isDesktop ? 50 : 0,
        y: isDesktop ? 0 : 30,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
        delay: 0.2
      });

      // Form animation
      gsap.from(formRef.current, {
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 85%",
        },
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
        delay: 0.4
      });
    }, sectionRef);

    return () => mm.revert();
  }, []);

  const handleImageLoad = () => {
    ScrollTrigger.refresh();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here

    alert("Благодарим Ви! Вашето съобщение беше изпратено.");

    //TODO : Implement sending emails
  };


  return (
      <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div ref={titleRef} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 tracking-tight">
            СВЪРЖЕТЕ СЕ С <span className="text-gold">НАС</span>
          </h1>
          <div className="w-24 h-1 bg-primary-gradient mx-auto mt-4 rounded-full"/>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-24">
          {/* Left Side: Image and Info */}
          <div className="space-y-12">
            <div ref={imageRef}
                 className="relative group overflow-hidden rounded-2xl shadow-xl aspect-[16/9] bg-gray-100">
              <img
                  src="/images/contact_hero.png"
                  alt="Salon Interior"
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                  onLoad={handleImageLoad}
              />
              <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-transparent"/>
            </div>

            <div ref={infoRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">Нашият Салон</h3>
                <div className="space-y-2 text-gray-600">
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full"/>
                    ул. „Примерна“ 123, София
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full"/>
                    +359 888 123 456
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full"/>
                    hello@hairsalon.bg
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">Работно Време</h3>
                <div className="space-y-2 text-gray-600">
                  <p>Пон - Пет: 10:00 - 19:00</p>
                  <p>Събота: 10:00 - 18:00</p>
                  <p>Неделя: Почивен ден</p>
                </div>
              </div>

              <div className="md:col-span-2 pt-4">
                <button
                    onClick={() => navigate("/about")}
                    className="text-gray-800 font-medium hover:text-yellow-600 transition-colors flex items-center gap-2 group"
                >
                  Научете повече за нас
                  <span className="transform transition-transform group-hover:translate-x-1">→</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div ref={formRef} className="bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Пишете ни</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Име</label>
                  <input
                      required
                      type="text"
                      placeholder="Вашето име"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <input
                      required
                      type="email"
                      placeholder="example@mail.com"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Тема</label>
                <input
                    required
                    type="text"
                    placeholder="Как можем да Ви помогнем?"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Съобщение</label>
                <textarea
                    required
                    rows="4"
                    placeholder="Вашето съобщение тук..."
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all resize-none"
                ></textarea>
              </div>
              <button
                  type="submit"
                  className="w-full bg-primary-gradient text-white font-bold py-4 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 active:scale-95"
              >
                Изпрати Съобщение
              </button>
            </form>
          </div>
        </div>
      </div>
  );
};

export default Contact;
