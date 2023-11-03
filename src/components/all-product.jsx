/* eslint-disable react/prop-types */
import { useState } from 'react';
import { FaCartPlus, FaEye, FaHeart, FaStar, FaStarHalfAlt, FaAngleDoubleRight, FaAngleDoubleLeft } from 'react-icons/fa';



const products = [
  { imageUrl: 'https://กรุงเทพเคมี.com/image/cache/catalog/Mark%20Scrub%20category%20(X)/X209BMB/X209BMB-550x550.jpg', title: 'Blender Massage Base Oil ', price: '285 BATH' },
  { imageUrl: 'https://กรุงเทพเคมี.com/image/cache/catalog/Cosmetics%20(C)/C002AA/C002-N-550x550.jpg', title: 'Alpha Arbutin (Canada)', price: '110 BATH' },
  { imageUrl: 'https://กรุงเทพเคมี.com/image/cache/catalog/Cosmetics%20(C)/C033GL/C033GL-100G-N-550x550.jpg', title: 'AHA 100% Glycolic Acid', price: '174 BATH' },
  { imageUrl: 'https://กรุงเทพเคมี.com/image/cache/catalog/Cosmetics%20(C)/C087AR/C087AR-10G-N-550x550.jpg', title: 'Alpha Arbutin (China)', price: '37 BATH' },
  { imageUrl: 'https://กรุงเทพเคมี.com/image/cache/catalog/Cosmetics%20(C)/C129AG/C129AG-100G-550x550.jpg', title: 'ALCOGUARD 1340', price: '65 BATH' },
  { imageUrl: 'https://กรุงเทพเคมี.com/image/cache/catalog/Cosmetics%20(C)/C061ALS/C061ALS-1KG-N-550x550.jpg', title: 'Ammonium Lauryl Sulfate', price: '80 BATH' },
  { imageUrl: 'https://กรุงเทพเคมี.com/image/cache/catalog/Food%20Additives%20(F)/F087BA/F087BA-100G-1-F-550x550.jpg', title: 'BCAA', price: '149 BATH' },
  { imageUrl: 'https://กรุงเทพเคมี.com/image/cache/catalog/Food%20Additives%20(F)/F094AL/F094AL-100G-F-550x550.jpg', title: 'Allulose', price: '89 BATH' },
  { imageUrl: 'https://กรุงเทพเคมี.com/image/cache/catalog/Food%20Additives%20(F)/F056AP/F056AP-500G-F-550x550.jpg', title: 'Almond Powder', price: '75 BATH' },
  { imageUrl: 'https://กรุงเทพเคมี.com/image/cache/catalog/Food%20Additives%20(F)/F063AA/F063AA-100G-F-550x550.jpg', title: 'Agar Agar powder (China)', price: '42 BATH' },
  { imageUrl: 'https://กรุงเทพเคมี.com/image/cache/catalog/Food%20Additives%20(F)/F008AA/F008AA-1KG-F-550x550.jpg', title: 'Ascorbic Acid Vitamin C', price: '39 BATH' },
  { imageUrl: 'https://กรุงเทพเคมี.com/image/cache/catalog/Essential%20oil%20(E)/E027AN/E027-new-01-550x550.jpg', title: 'Anise Essential Oil', price: '98 BATH' },
  { imageUrl: 'https://กรุงเทพเคมี.com/image/cache/catalog/Essential%20oil%20(E)/E019BM/E019-new-04-550x550.jpg', title: 'Bergamot Essential Oil', price: '135 BATH' },
 
];

const ProductCard = ({ product }) => {
  return (
    <div className="card-container flex flex-col relative w-auto bg-gray-200 mb-4 mx-2 sm:mx-auto shadow-sm">
      {/* Image */}
      <img src={product.imageUrl} alt={product.title} className="w-full h-40 object-cover" />
      
      {/* "Sold Out" overlay */}
      {product.stock === 0 && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <span className="text-xl font-bold text-white">Sold Out</span>
        </div>
      )}

      <div className="p-4 flex-1 flex flex-col justify-between">
        {/* Action buttons */}
        <div className='flex items-center justify-center bg-opacity-30 my-2'>
          {product.stock > 0 && (
            <button className="mx-2 text-lg text-gray-300 sm:text-xl sm:text-gray-300 hover:text-red-500 transition-all h-8 sm:h-12 w-8 sm:w-12 flex items-center justify-center">
              <FaCartPlus />
            </button>
          )}
          <button className="mx-2 text-lg text-gray-300 sm:text-xl sm:text-gray-300 hover:text-red-500 transition-all h-8 sm:h-12 w-8 sm:w-12 flex items-center justify-center">
            <FaEye />
          </button>
          <button className="mx-2 text-lg text-gray-300 sm:text-xl sm:text-gray-300 hover:text-red-500 transition-all h-8 sm:h-12 w-8 sm:w-12 flex items-center justify-center">
            <FaHeart />
          </button>
        </div>
        
        {/* Product Name */}
        <h2 className="text-sm sm:text-lg font-semibold mb-2 text-center">{product.title}</h2>
        
        {/* Product Price */}
        <p className="text-m sm:text-lg text-gray-500 text-center">{product.price}</p>
      </div>
    </div>
  );
};


function DefaultPagination({ handlePrevClick, handleNextClick, handlePageClick, products, startIndex }) {
  const productsPerPage = 12;
  const currentPage = Math.ceil((startIndex + 1) / productsPerPage);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const isPreviousDisabled = startIndex === 0;
  const isNextDisabled = startIndex + productsPerPage >= products.length;

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex items-center sm:gap-4 justify-center mt-12">
      <button
        className={`flex items-center sm:gap-2 p-2 ${isPreviousDisabled ? 'cursor-not-allowed' : ''}`}
        onClick={handlePrevClick}
        disabled={isPreviousDisabled}
      >
        <FaAngleDoubleLeft className="h-4 w-4" /> Previous
      </button>
      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          className={`px-4 ${
            pageNumber === currentPage
              ? 'bg-gray-200'
              : 'bg-white hover:bg-gray-200 hover:text-black'
          } transition-all`}
          onClick={() => {
            // Calculate the new start index based on the clicked page number
            const newStartIndex = (pageNumber - 1) * productsPerPage;
            handlePageClick(newStartIndex);
          }}
        >
          {pageNumber}
        </button>
      ))}
      <button
        className={`flex items-center gap-2 p-2 ${isNextDisabled ? 'cursor-not-allowed' : ''}`}
        onClick={handleNextClick}
        disabled={isNextDisabled}
      >
        Next <FaAngleDoubleRight className="h-4 w-4" />
      </button>
    </div>
  );
}



const productsPerPage = 12; // Number of products to display per page

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

  const handlePageClick = (newStartIndex) => {
    setIsFading(true); // Apply fade transition
    setTimeout(() => {
      setStartIndex(newStartIndex);
      setIsFading(false); // Remove fade transition
    }, 300); // Adjust the duration to match your CSS transition duration
  };

  return (
    <div className="sm:mx-2 md:mx-2 lg:mx-2 xl:mx-2 mt-2 pb-12 w- ml-2 bg-[#fafafa]">
    <div className="flex mb-2 font-semibold w-full">
      <h1 className="text-2xl font-bold px-2 py-4 text-bold text-center">ALL PRODUCT</h1>
    </div>
    <div className={`grid grid-cols-2 sm:grid-cols-4 sm:gap-2 justify-center ${isFading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
      {products.slice(startIndex, startIndex + productsPerPage).map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
    <DefaultPagination
  handlePrevClick={handlePrevClick}
  handleNextClick={handleNextClick}
  handlePageClick={handlePageClick}
  products={products}
  startIndex={startIndex}
/>
  </div>
);
};

export default NewProduct;