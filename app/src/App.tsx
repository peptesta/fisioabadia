import Hero from './sections/Hero';
import Fisioterapia from './sections/Fisioterapia';
import Conditions from './sections/Conditions';
import Treatments from './sections/Tratamientos';
//import GoogleReviews from './sections/GoogleReviews';
//import FullWidthImage from './sections/FullWidthImage';
import SessionsInfo from './sections/SessionsInfo';
import ParallaxBanner from './sections/ParallaxBanner';
import AboutPhysio from './sections/AboutPhysio';
import PatientTestimonials from './sections/PatientTestimonials';
import FAQ from './sections/FAQ';
import Footer from './sections/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Fisioterapia />
      <Conditions />
      <Treatments />
      {/*<GoogleReviews />
      <FullWidthImage />*/}
      <SessionsInfo />
      <ParallaxBanner />
      <AboutPhysio />
      <PatientTestimonials />
      <FAQ />
      <Footer />
    </div>
  );
}

export default App;
