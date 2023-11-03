import { useState } from 'react';
import OptionBar from '../components/option-bar';
import MiniHeader from '../components/mini-header';
import AllProduct from "../components/all-product";
import FilterTab from '../components/left-filter-tab';
import Contact from '../components/contact';
import Footer from '../components/footer';
import BurgerNav from '../components/burger-bar';
import FilterBar from '../components/filter-bar-mobile';
import NavBar from '../components/navbar';

const ShopPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPriceRanges, setSelectedPriceRanges] = useState('');

  return(
    <>
      <MiniHeader />
        <OptionBar />
      <div className="sticky top-0 z-50 bg-white">
        <BurgerNav />
        <NavBar />
        <FilterBar setSelectedCategory={setSelectedCategory} setSelectedPriceRanges={setSelectedPriceRanges} />
      </div>

      <div className="flex mt-6 w-full justify-center mx-0 sm:mx-0 md:mx-0 lg:mx-0 xl:mx-48">
        <aside className='hidden sm:hidden md:hidden lg:hidden xl:block'>
            <FilterTab onSelectCategory={setSelectedCategory} />
        </aside>

        <main>
          <AllProduct selectedCategory={selectedCategory} selectedPriceRanges={selectedPriceRanges} />
        </main>
      </div>

      <Contact />
      <Footer />
    </>
  );
}

export default ShopPage;
