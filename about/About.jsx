import React, { useState, useEffect, lazy, Suspense } from "react";
import { aboutBg } from "../src/assets";
import { aboutItems } from "../src/constants";
import Loading from "../src/components/Loading";

const Footer = lazy(() => import("../src/components/Footer"));
const HeroHeader = lazy(() => import("../src/components/HeroHeader"));
const Navbar = lazy(() => import("../src/components/Navbar"));
const RegisterSection = lazy(() => import("../src/components/RegisterSection"));
const Specifications = lazy(() => import("../src/components/Specifications"));

const About = () => {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY >= 105) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`${scrolled ? "flex flex-col" : ""}`}>
      <Suspense fallback={<Loading />}>
        {scrolled && <Navbar active="ABOUT" scrolled={scrolled} />}
        <HeroHeader />
      </Suspense>

      <div className="w-full h-[500px] sm:h-[616px] relative">
        <div
          className={`w-full h-full bg-black bg-opacity-20 absolute top-0 left-0 flex flex-col ${
            scrolled ? "justify-end" : "justify-between"
          } items-center text-white`}
        >
          <Suspense fallback={<Loading />}>
            {scrolled || <Navbar active="ABOUT" scrolled={scrolled} />}
          </Suspense>

          <div className="w-[60%] h-[15%] flex flex-col ">
            <div className="w-full h-[60%] text-center pt-2 bg-red-900">
              <p className="text-[20px] font-bold text-white">
                About Deukhuri Multiple Campus
              </p>
            </div>
            <div className="w-full h-[40%] bg-white" />
          </div>
        </div>
        <img
          src={aboutBg}
          alt="Graduate BG"
          className="w-full h-full object-cover -z-10"
        />
      </div>

      <div className={`p-4 flex w-full h-auto  justify-between`}>
        <div className="h-full w-[18%] hidden  sm:flex flex-col shadow-xl p-3 bg-red-900 text-white">
          About Deukhuri Multiple Campus
        </div>

        <div className="flex flex-col h-full w-[90%] sm:w-[70%] mx-2 sm:mr-32">
          <p className="text-[14px] font-light w-full text-justify">
            Deukhuri Multiple Campus was established in 2005 AD (2062 BS) as a
            community campus located in Lamahi, Deukhuri, Dang district of
            Nepal. This campus is running with the supports of community people
            and University Grants Commission of Nepal. It is affiliated to
            Tribhuvan University (TU) for Bachelor and Master Degree programs.
            It has been imparting quality education in the facilities of
            Management, Arts and Science. <br /> <br /> Deukhuri Multiple Campus
            offers Bachelor level and Master level programs such as Bachelor of
            Arts (BA), Bachelor of Education (B.Ed.), Bachelor of Business
            Studies (BBS), Master of Education (M.Ed.) programs. It provides
            various Facilities such as Library, Sports, Cafeteria, Labs,
            Multimedia, Internet, E-library, Journal, Counselling, Educational
            Tours, Scholarship, Conference and Internship for deserving
            students.
          </p>

          <Suspense fallback={<Loading />}>
            <Specifications />
          </Suspense>

          <p className="text-[16px] font-semibold my-3">
            Our Missions and Values
          </p>

          <p className="text-[14px] my-3 font-light text-justify">
            The mission of DMC is to develop itself as a leading academic
            institution ensuring the quality education in various discipline and
            research activities through dedicated human resource at affordable
            cost to the marginalized and economically deprived students to
            improve their quality of life contributing local and national
            community.
          </p>

          <div className="flex flex-wrap justify-between w-full h-auto">
            {aboutItems.map((item, index) => {
              return (
                <div className="flex flex-col justify-around m-3 w-full sm:w-[40%] h-auto sm:h-[150px] text-justify">
                  <p className="text-[16px] font-semibold">{item.title}</p>
                  <p className="text-[14px] font-light text-slate-600">
                    {item.content}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Suspense fallback={<Loading />}>
        <div className="w-full">
          <RegisterSection />
          <Footer />
        </div>
      </Suspense>
    </div>
  );
};

export default About;
