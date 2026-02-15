import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import Intro from './sections/Intro';
import Fisioterapia from './sections/Fisioterapia';
import Conditions from './sections/Conditions';
import Treatments from './sections/Tratamientos';
import GoogleReviews from './sections/GoogleReviews';
import FullWidthImage from './sections/FullWidthImage';
import SessionsInfo from './sections/SessionsInfo';
import ParallaxBanner from './sections/ParallaxBanner';
import AboutPhysio from './sections/AboutPhysio';
import PatientTestimonials from './sections/PatientTestimonials';
import FAQ from './sections/FAQ';
import Footer from './sections/Footer';
import FloatingButtons from './sections/FloatingButtons';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Intro />
      <Fisioterapia />
      <Conditions />
      <Treatments />
      <GoogleReviews />
      <FullWidthImage />
      <SessionsInfo />
      <ParallaxBanner />
      <AboutPhysio />
      <PatientTestimonials />
      <FAQ />
      <Footer />
      <FloatingButtons />
    </div>
  );
}

export default App;
