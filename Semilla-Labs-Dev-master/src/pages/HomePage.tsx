import React from "react";

import HomeHero from "../components/HomeHero";
import Partners from "../components/Partners";
import HomeSectionOne from "../components/HomeSectionOne";
import HomeSectionTwo from "../components/HomeSectionTwo";
import JoinDiscordSection from "../components/JoinDiscordSection";

const HomePage: React.FC = () => {
  return (
    <>
      <HomeHero />

      <HomeSectionTwo />

      {/* <HomeSectionOne /> */}

      {/* <JoinDiscordSection /> */}

      <Partners />
    </>
  );
};

export default HomePage;
