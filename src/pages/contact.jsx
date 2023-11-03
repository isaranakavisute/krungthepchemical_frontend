import OptionBar from '../components/option-bar';
import MiniHeader from '../components/mini-header';
import NavBar from '../components/navbar';
import ContactUs from "../components/contact-us";
import Contact from '../components/contact';
import Footer from '../components/footer';
import BurgerNav from '../components/burger-bar';

const ContactPage = () => {
  return (
    <div>
    <MiniHeader />
            <OptionBar />
    <div className="sticky top-0 z-50">
            <NavBar />
            <BurgerNav />
            </div>
      <ContactUs /> {/* เรียกใช้ ContactUs component ที่เราสร้างขึ้น */}
      <Contact />
    <Footer />
    </div>
  );
};

export default ContactPage;
