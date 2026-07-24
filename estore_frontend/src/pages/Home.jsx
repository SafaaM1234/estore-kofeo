// src/pages/Home.jsx
import React from "react";
import HeroSection from "../components/home/HeroSection";
import Categories from "../components/home/Categories";
import BestSellers from "../components/home/BestSellers";
import WhyChooseUs from "../components/home/WhyChooseUs";
import SiteFeedbackSection from "../components/home/SiteFeedbackSection";

const Home = () => {
  return (
    <>
      <HeroSection />
      <Categories />
      <BestSellers />
      <WhyChooseUs />
      <SiteFeedbackSection />
    </>
  );
};

export default Home;

