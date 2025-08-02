import LandingPage from './Components/LandingPage';
import Testimonial from "./Components/Testimonial";
import Services from './Components/Services';
import Contactus from './Components/Contactus';
import Footer from './Components/Footer';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Home() {
  return (
    <main className="bg-blue-100">
      
      {/* hero section */}
    <LandingPage />
    
    {/* Services */}
    <Services />

    {/* testimonial */}
    <Testimonial />

    {/* Contact us  */}
    <Contactus />

    {/* Footer */}
    <Footer />
          </main>
  );
}
