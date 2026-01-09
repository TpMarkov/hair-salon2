import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 1024px)",
      isSmall: "(max-width: 1023px)"
    }, (context) => {
      let { isDesktop } = context.conditions;

      gsap.from(".about-title", {
        y: isDesktop ? 50 : 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });

      gsap.from(imageRef.current, {
        scrollTrigger: {
          trigger: imageRef.current,
          start: isDesktop ? "top 80%" : "top 90%",
        },
        x: isDesktop ? -100 : 0,
        y: isDesktop ? 0 : 30,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out"
      });

      gsap.from(textRef.current, {
        scrollTrigger: {
          trigger: textRef.current,
          start: isDesktop ? "top 80%" : "top 90%",
        },
        x: isDesktop ? 100 : 0,
        y: isDesktop ? 0 : 30,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out"
      });
    }, sectionRef);

    // Initial refresh after a small delay to handle layout settling
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      mm.revert();
      clearTimeout(timer);
    };
  }, []);

  const handleImageLoad = () => {
    ScrollTrigger.refresh();
  };

  const values = [
    { title: "Прецизност", desc: "Всеки детайл е важен за нас, за да постигнем перфектния резултат." },
    { title: "Качество", desc: "Работим само с подбрани, висококачествени продукти за Вашата коса." },
    { title: "Опит", desc: "Нашият екип притежава дългогодишен опит и страст към фризьорството." }
  ];

  return (
    <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Title Section */}
      <div className="text-center mb-16 overflow-hidden">
        <h1 className="about-title text-4xl md:text-5xl font-bold text-gray-800 tracking-tight">
          ЗА <span className="text-gold">НАС</span>
        </h1>
        <div className="w-24 h-1 bg-primary-gradient mx-auto mt-4 rounded-full" />
      </div>

      {/* Hero Section / Our Story */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
        <div ref={imageRef} className="relative group overflow-hidden rounded-2xl shadow-2xl aspect-[4/3] bg-gray-100">
          <img
            src="/images/11.jpg"
            alt="about-image"
            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
            onLoad={handleImageLoad}
          />
          <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-transparent" />
        </div>

        <div ref={textRef} className="space-y-6 text-lg text-gray-600 leading-relaxed">
          <p className="font-medium text-gray-800 text-xl border-l-4 border-yellow-500 pl-4 italic">
            Ние вярваме, че косата е отражение на твоята индивидуалност.
          </p>
          <p>
            В нашия салон съчетаваме стил, прецизност и внимание към всеки детайл.
            Работим с висококачествени продукти и съвременни техники, за да постигнем визия,
            която подчертава естествената ти красота и увереност.
          </p>
          <p>
            Довери се на професионален екип, който ще се погрижи за твоята коса с грижа, опит и вдъхновение.
            Нашата мисия е да те накараме да се почувстваш не просто красива, а преобразена.
          </p>
        </div>
      </div>

      {/* Values Grid */}
      <div className="values-grid grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {values.map((v, idx) => (
          <div
            key={idx}
            className="value-card p-8 bg-white rounded-xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group"
          >
            <div className="w-12 h-12 bg-primary-gradient rounded-lg mb-6 flex items-center justify-center text-white font-bold text-xl">
              {idx + 1}
            </div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800 group-hover:text-yellow-600 transition-colors">
              {v.title}
            </h3>
            <p className="text-gray-600">
              {v.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;

