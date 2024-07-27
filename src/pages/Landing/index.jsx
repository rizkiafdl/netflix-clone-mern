import React from 'react';

import Jumbotron from '@mods/LandingPage/Jumbotron';
import SectionEnjoy from '@mods/LandingPage/SectionContents/SectionEnjoy';
import SectionWatch from '@mods/LandingPage/SectionContents/SectionWatch';
import SectionProfile from '@mods/LandingPage/SectionContents/SectionProfile';
import SectionFaq from '@mods/LandingPage/SectionContents/SectionFaq';
import Footer from '@mods/LandingPage/Footer';
import SectionDownload from '@/components/Modules/LandingPage/SectionContents/SectionDownload';
import Navbar from './Navbar';




function Landing() {
  //variable pertama read only, variable kedua write.
  //nilai default ("Netflix state") masuk ke parameter pertama.
  return (
    //Single Parent
    //Component Wajib Capslock di awal
    <>
      <Navbar />
      <Jumbotron />
      <SectionEnjoy />
      <SectionDownload />
      <SectionWatch />
      <SectionProfile />
      <SectionFaq />
      <Footer />
    </>
  );
}

export default Landing
