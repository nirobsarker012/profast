import React from "react";
import trackingImg from "../assets/live-tracking.png";
import delivery from "../assets/safe-delivery.png";

const ParcelDetailsCards = () => {
  return (
    <section
      data-aos="fade-up"
      data-aos-anchor-placement="bottom-center"
      className="border-t border-b border-dashed border-[#03464D] py-[80px] container urban"
    >
      <div className="flex flex-col space-y-6">
        <div className="p-8 bg-white rounded-[24px] flex justify-between items-center space-x-[48px]">
          <div className="">
            <img src={trackingImg} alt="" className="" />
          </div>
          <div className="flex space-x-[48px]">
            <span className="border border-dashed border-[#03464D]"></span>
            <div className="flex flex-col space-y-4">
              <h2 className="font-extrabold text-[#03373D] text-[24px]">
                Live Parcel Tracking
              </h2>
              <p className="text-[#606060] font-medium text-[16px]">
                Stay updated in real-time with our live parcel tracking feature.
                From pick-up to delivery, monitor your shipment's journey and
                get instant status updates for complete peace of mind.
              </p>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="p-8 bg-white rounded-[24px] flex justify-between items-center space-x-[48px]">
          <div className="">
            <img src={delivery} alt="" className="" />
          </div>
          <div className="flex space-x-[48px]">
            <span className="border border-dashed border-[#03464D]"></span>
            <div className="flex flex-col space-y-4">
              <h2 className="font-extrabold text-[#03373D] text-[24px]">
                100% Safe Delivery
              </h2>
              <p className="text-[#606060] font-medium text-[16px]">
                We ensure your parcels are handled with the utmost care and
                delivered securely to their destination. Our reliable process
                guarantees safe and damage-free delivery every time.
              </p>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="p-8 bg-white rounded-[24px] flex justify-between items-center space-x-[48px]">
          <div className="">
            <img src={delivery} alt="" className="" />
          </div>
          <div className="flex space-x-[48px]">
            <span className="border border-dashed border-[#03464D]"></span>
            <div className="flex flex-col space-y-4">
              <h2 className="font-extrabold text-[#03373D] text-[24px]">
                24/7 Call Center Support
              </h2>
              <p className="text-[#606060] font-medium text-[16px]">
                Our dedicated support team is available around the clock to
                assist you with any questions, updates, or delivery
                concerns—anytime you need us.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParcelDetailsCards;
