/* eslint-disable react/prop-types */
import { useState } from 'react';
import { FaCartPlus, FaEye, FaHeart, FaAngleRight, FaAngleLeft } from 'react-icons/fa';



const products = [
  { imageUrl: 'https://กรุงเทพเคมี.com/image/cache/catalog/Mark%20Scrub%20category%20(X)/X209BMB/X209BMB-550x550.jpg', title: 'Blender Massage Base Oil ', price: '285 BATH' },
  { imageUrl: 'https://กรุงเทพเคมี.com/image/cache/catalog/Cosmetics%20(C)/C002AA/C002-N-550x550.jpg', title: 'Alpha Arbutin (Canada)', price: '110 BATH' },
  { imageUrl: 'https://กรุงเทพเคมี.com/image/cache/catalog/Cosmetics%20(C)/C033GL/C033GL-100G-N-550x550.jpg', title: 'AHA 100% Glycolic Acid', price: '174 BATH' },
  { imageUrl: 'https://กรุงเทพเคมี.com/image/cache/catalog/Cosmetics%20(C)/C087AR/C087AR-10G-N-550x550.jpg', title: 'Alpha Arbutin (China)', price: '37 BATH' },
  { imageUrl: 'https://กรุงเทพเคมี.com/image/cache/catalog/Cosmetics%20(C)/C129AG/C129AG-100G-550x550.jpg', title: 'ALCOGUARD 1340', price: '65 BATH' },
  { imageUrl: 'https://กรุงเทพเคมี.com/image/cache/catalog/Cosmetics%20(C)/C061ALS/C061ALS-1KG-N-550x550.jpg', title: 'ALS (Germany)', price: '80 BATH' },
  { imageUrl: 'https://กรุงเทพเคมี.com/image/cache/catalog/Food%20Additives%20(F)/F008AA/F008AA-1KG-F-550x550.jpg', title: 'Ascorbic Acid Vitamin C (China) ', price: '39 BATH' },
  { imageUrl: 'https://กรุงเทพเคมี.com/image/cache/catalog/Food%20Additives%20(F)/F004CA/F004CA-100G-F-550x550.jpg', title: 'Citric Acid Anhydrous (China) ', price: '35 BATH' },
  { imageUrl: 'https://กรุงเทพเคมี.com/image/cache/catalog/Food%20Additives%20(F)/F086AB/F086AB-1KG-F-550x550.jpg', title: 'Ammonium Bicarbonate (China) ', price: '31 BATH' },
  { imageUrl: 'https://กรุงเทพเคมี.com/image/cache/catalog/Food%20Additives%20(F)/F087BA/F087BA-100G-1-F-550x550.jpg', title: 'BCAA (Branched-chain amino acid) ', price: '149 BATH' },
  { imageUrl: 'https://กรุงเทพเคมี.com/image/cache/catalog/Food%20Additives%20(F)/F094AL/F094AL-100G-F-550x550.jpg', title: 'Allulose', price: '89 BATH' },
  { imageUrl: 'https://กรุงเทพเคมี.com/image/cache/catalog/Food%20Additives%20(F)/F056AP/F056AP-500G-F-550x550.jpg', title: 'Almond Powder', price: '75 BATH' },
  { imageUrl: 'https://กรุงเทพเคมี.com/image/cache/catalog/Food%20Additives%20(F)/F063AA/F063AA-100G-F-550x550.jpg', title: 'Agar Agar powder (China)', price: '42 BATH' },
  { imageUrl: 'https://กรุงเทพเคมี.com/image/cache/catalog/Food%20Additives%20(F)/F008AA/F008AA-1KG-F-550x550.jpg', title: 'Ascorbic Acid Vitamin C', price: '39 BATH' },
  { imageUrl: 'https://กรุงเทพเคมี.com/image/cache/catalog/Essential%20oil%20(E)/E027AN/E027-new-01-550x550.jpg', title: 'Anise Essential Oil', price: '98 BATH' },
  { imageUrl: 'https://กรุงเทพเคมี.com/image/cache/catalog/Essential%20oil%20(E)/E019BM/E019-new-04-550x550.jpg', title: 'Bergamot Essential Oil', price: '135 BATH' },
 
];

const ProductCard = ({ product }) => {
  return (
    <div className="card-container text-center relative my-2 h-50 bg-white mx-2 sm:mx-auto">
      <img src={product.imageUrl} alt={product.title} className="w-full h-auto object-cover p-6" />
      <div>
        <h2 className="text-sm sm:text-lg font-semibold mb-2">{product.title}</h2>
        <p className="text-gray-500 text-sm sm:text-base">{product.price}</p>
      <div className='flex items-center justify-center bg-[#2e3192ff] mt-2'>
        <button className="mx-2 text-lg text-white sm:text-xl sm:text-white hover:text-gray-400 transition-all h-8 sm:h-12 w-8 sm:w-12 flex items-center justify-center">
          <FaCartPlus />
        </button>
        <button className="mx-2 text-lg text-white sm:text-xl sm:text-white hover:text-gray-400 transition-all h-8 sm:h-12 w-8 sm:w-12 flex items-center justify-center">
          <FaEye />
        </button>
        <button className="mx-2 text-lg text-white sm:text-xl sm:text-white hover:text-gray-400 transition-all h-8 sm:h-12 w-8 sm:w-12 flex items-center justify-center">
          <FaHeart />
        </button>
      </div>
      </div>
    </div>
  );
};


const productsPerPage = 4; // Number of products to display per page

const NewProduct = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const handlePrevClick = () => {
    if (startIndex > 0) {
      setIsFading(true); // Apply fade transition
      setTimeout(() => {
        setStartIndex(startIndex - productsPerPage);
        setIsFading(false); // Remove fade transition
      }, 300); // Adjust the duration to match your CSS transition duration
    }
  };

  const handleNextClick = () => {
    if (startIndex + productsPerPage < products.length) {
      setIsFading(true); // Apply fade transition
      setTimeout(() => {
        setStartIndex(startIndex + productsPerPage);
        setIsFading(false); // Remove fade transition
      }, 300); // Adjust the duration to match your CSS transition duration
    }
  };


  return (
    <div className="sm:mx-4 md:mx-4 lg:mx-4 xl:mx-48 px-0 mt-12 pb-4 w-auto bg-[#fafafa]">
      <div className="flex mb-2 font-semibold w-full">
        <h1 className="text-lg sm:text-2xl font-bold px-2 text-bold text-center">NEW PRODUCT</h1>
        <div className="flex my-auto ml-auto sm:mr-4">
          <button
            className="bg-white text-[#2e3192] text-lg rounded-full h-8 w-8 my-auto transition-colors hover:bg-white hover:text-[#2e3192] flex items-center justify-center"
            onClick={handlePrevClick}
          >
            <FaAngleLeft />
          </button>
          <button
            className="bg-white text-[#2e3192] text-lg rounded-full ml-2 h-8 w-8 my-auto transition-colors hover:bg-white hover:text-[#2e3192] flex items-center justify-center"
            onClick={handleNextClick}
          >
            <FaAngleRight />
          </button>
        </div>
      </div>
      <div className={`grid grid-cols-2 sm:grid-cols-4 sm:gap-2 justify-center ${isFading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
        {products.slice(startIndex, startIndex + productsPerPage).map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default NewProduct;