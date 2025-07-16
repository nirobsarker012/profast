import React from "react";
import merchantImg from "../assets/location-merchant.png";
import merchantImg2 from "../assets/be-a-merchant-bg.png";

const MarchantBanner = () => {
  return (
    <section className="bg-[#03373D] container p-[80px] rounded-[32px] my-[80px] relative overflow-hidden">
      {/* Top-right background image */}
      <img
        src={merchantImg2}
        alt=""
        className="absolute top-0 right-0 z-0 w-[600px] lg:w-auto"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-2.5">
        {/* Text Section */}
        <div className="lg:w-1/2">
          <h2 className="text-white text-[32px] lg:text-[40px] font-extrabold mb-[18px] leading-tight">
            Merchant and Customer Satisfaction is Our First Priority
          </h2>
          <p className="text-[#DADADA] text-[14px] lg:text-[16px] mb-[32px]">
            We offer the lowest delivery charge with the highest value along
            with 100% safety of your product. Pathao courier delivers your
            parcels in every corner of Bangladesh right on time.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-[#CAEB66] rounded-[99px] py-3 px-4 lg:py-4 lg:px-8 font-bold text-[12px] lg:text-[20px] text-[#1F1F1F] border border-[#CAEB66] hover:bg-transparent hover:text-[#CAEB66] transition-all duration-300 cursor-pointer">
              Become a Merchant
            </button>
            <button className="rounded-[99px] py-3 px-4 lg:py-4 lg:px-8 font-bold text-[12px] lg:text-[20px] text-[#CAEB66] border border-[#CAEB66] hover:bg-[#CAEB66] hover:text-[#1F1F1F] transition-all duration-300 cursor-pointer">
              Earn With Profast Courier
            </button>
          </div>
        </div>

        {/* Foreground Image */}
        <img src={merchantImg} alt="merchant parcel" className="lg:w-1/2" />
      </div>
    </section>
  );
};

export default MarchantBanner;
