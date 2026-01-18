import React from "react";

const GoogleMap = ({
    src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d188099.98231221703!2d23.3218675!3d42.6977082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa8682cb317bf5%3A0x400a01269bf5e60!2sSofia%2C%20Bulgaria!5e0!3m2!1sen!2sus!4v1647855000000!5m2!1sen!2sus",
    className = "",
    width = "100%",
    height = "100%"
}) => {
    return (
        <div className={`overflow-hidden rounded-xl shadow-lg border border-gray-200 bg-gray-100 ${className}`}>
            <iframe
                src={src}
                width={width}
                height={height}
                style={{ border: 0, width: "100%", height: "100%" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map Location"
                className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-500"
            ></iframe>
        </div>
    );
};

export default GoogleMap;
