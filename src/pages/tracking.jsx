import OptionBar from '../components/option-bar';
import MiniHeader from '../components/mini-header';
import Tracking from '../components/tracking-comp';
import Footer from '../components/footer';
import Contact from '../components/contact';
import BurgerNav from '../components/burger-bar';

const TrackingPage = () => {
  return (
    <div>
    <MiniHeader />
    <div className="sticky top-0 z-50">
            <OptionBar />
            <BurgerNav />
            </div>
    <Tracking />
      <Contact />
    <Footer />
    </div>
  );
};

export default TrackingPage;
