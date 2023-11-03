import OptionBar from '../components/option-bar';
import MiniHeader from '../components/mini-header';
import NavBar from '../components/navbar';
import Slider from '../components/slider';
import HotCategoriesBar from '../components/hot-category';
import NewProduct from '../components/new-product';
import ThreeCard from '../components/three-card';
import FlashSale from '../components/flash-sales';

import LatestNews from '../components/latest-new';
import Contact from '../components/contact';
import Footer from '../components/footer';
import PopularProduct from '../components/popular-product'
import BestProduct from '../components/best-product'
import CombinedNav from '../components/burger-bar';

const HomePage = () => {

  return (
    <>
      <MiniHeader />
        <OptionBar />
      <div className="sticky top-0 z-40">
        <NavBar />
        <CombinedNav />
      </div>
      <Slider />
          <FlashSale />
      <HotCategoriesBar />
          <NewProduct />
          <PopularProduct />
          <BestProduct />
          <ThreeCard />
      <LatestNews />
      <Contact />
      <Footer />
    </>
  )
}

export default HomePage;