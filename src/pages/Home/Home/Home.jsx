import React from "react";
import Banner from "../Banner/Banner";
import Works from "../Works/Works";
import OurServices from "../../../components/OurServices";
import BrandMarquee from "../../../components/BrandMarquee";
import ParcelDetailsCards from "../../../components/ParcelDetailsCards";
import MarchantBanner from "../../../components/MarchantBanner";

const Home = () => {
  return (
    <div>
      <Banner />
      <Works />
      <OurServices />
      <BrandMarquee />
      <ParcelDetailsCards />
      <MarchantBanner />
    </div>
  );
};

export default Home;
