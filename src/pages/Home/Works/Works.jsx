import React from "react";
import delivery from "../../../assets/bookingIcon.png";

const Works = () => {
  return (
    <section>
      {/* Work Heading */}
      <div className="mt-[60px] mb-8 container">
        <h3 className="font-extrabold text-[20px] md:text-2xl lg:text-3xl text-[#03373D] mb-8">
          How it Work
        </h3>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6">
          {/* 1 */}
          <div className="bg-white rounded-3xl p-8">
            <div className="flex flex-col space-y-3">
              <img className="w-[56px]" src={delivery} alt="" />
              <div className="flex flex-col space-y-[16px]">
                <h3 className="text-[#03373D] font-bold text-16 md:text-[18px] lg:text-[20px]">
                  Booking Pick & Drop
                </h3>
                <p className="text-[#606060] text-4">
                  From personal packages to business shipments — we deliver on
                  time, every time.
                </p>
              </div>
            </div>
          </div>
          {/* 2 */}
          <div className="bg-white rounded-3xl p-8">
            <div className="flex flex-col space-y-3">
              <img className="w-[56px]" src={delivery} alt="" />
              <div className="flex flex-col space-y-[16px]">
                <h3 className="text-[#03373D] font-bold text-16 md:text-[18px] lg:text-[20px]">
                  Cash On Delivery
                </h3>
                <p className="text-[#606060] text-4">
                  From personal packages to business shipments — we deliver on
                  time, every time.
                </p>
              </div>
            </div>
          </div>
          {/* 3 */}
          <div className="bg-white rounded-3xl p-8">
            <div className="flex flex-col space-y-3">
              <img className="w-[56px]" src={delivery} alt="" />
              <div className="flex flex-col space-y-[16px]">
                <h3 className="text-[#03373D] font-bold text-16 md:text-[18px] lg:text-[20px]">
                  Delivery Hub
                </h3>
                <p className="text-[#606060] text-4">
                  From personal packages to business shipments — we deliver on
                  time, every time.
                </p>
              </div>
            </div>
          </div>
          {/* 4 */}
          <div className="bg-white rounded-3xl p-8">
            <div className="flex flex-col space-y-3">
              <img className="w-[56px]" src={delivery} alt="" />
              <div className="flex flex-col space-y-[16px]">
                <h3 className="text-[#03373D] font-bold text-16 md:text-[18px] lg:text-[20px]">
                  Booking SME & Corporate
                </h3>
                <p className="text-[#606060] text-4">
                  From personal packages to business shipments — we deliver on
                  time, every time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Works;
