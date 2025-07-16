import React from "react";
import logo1 from "../assets/brands/amazon.png";
import logo2 from "../assets/brands/amazon_vector.png";
import logo3 from "../assets/brands/casio.png";
import logo4 from "../assets/brands/moonstar.png";
import logo5 from "../assets/brands/randstad.png";
import logo6 from "../assets/brands/start-people 1.png";
import logo7 from "../assets/brands/start.png";
import Marquee from "react-fast-marquee";

const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7];

const BrandMarquee = () => {
  return (
    <section>
      <div className="flex items-center justify-center container">
        <h2 className="text-[#03373D] font-extrabold text-[28px] my-6">
          We've helped thousands of sales teams
        </h2>
      </div>
      <Marquee
        className="container mb-12"
        pauseOnHover
        speed={50}
        gradient={true}
        gradientColor="#eaeced"
      >
        {logos.map((logo, idx) => (
          <div key={idx} className="mx-8 mb-6 flex items-center">
            <img
              src={logo}
              alt={`Brand Logo ${idx + 1}`}
              className="h-6 object-contain"
            />
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default BrandMarquee;
