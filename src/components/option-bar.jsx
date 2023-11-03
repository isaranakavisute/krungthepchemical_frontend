import { useState } from 'react';
import { FaUser, FaShoppingCart } from 'react-icons/fa';
import CartDropdown from './cart-dropdown';

const OptionBar = () => {
  const [isCartDropdownOpen, setIsCartDropdownOpen] = useState(false); // เพิ่ม state สำหรับการเปิด-ปิด dropdown

  // คลิกที่ไอคอน FaShoppingCart ให้เปิด dropdown
  const handleCartIconClick = () => {
    setIsCartDropdownOpen(!isCartDropdownOpen);
  };
  return (
    <div className="bar-container bg-white flex items-center justify-between sm:px-4 md:px-8 lg:px-8 xl:px-48 w-auto hidden sm:hidden md:hidden lg:hidden xl:flex">
      <div className="flex items-center space-x-4 px-4">
        <img src='https://jpthinkofus.com/fiat/sandbox3/logo_poly.png' className="h-24 p-2" alt="Logo"/>
        <div>
      <div className="relative mt-2 sm:ml-48 rounded-full">
        <div className="absolute inset-y-0 right-0 flex items-center pl-3">
          <button className='rounded-full text-sm text-white font-semibold bg-[#2e3192] h-full px-4 transition-colors hover:bg-white hover:text-[#2e3192]'>SEARCH</button>
        </div>
        <input
          type="text"
          className="block w-full rounded-full border-0 py-1.5 pl-44 pr-60 text-gray-900"
          placeholder="search..."
        />
        <div className="absolute inset-y-0 left-0 flex items-center">
          <select
            className="h-full rounded-full border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 sm:text-sm cursor-pointer"
          >
            <option>All Categories</option>
            <option value="1">Food Additives</option>
          <option value="2">Sweetener</option>
          <option value="3">General Chemicals</option>
          <option value="4">Essential oil</option>
          <option value="5">Cosmetics</option>
          </select>
        </div>
      </div>
    </div>
      </div>
      <div className="flex items-center space-x-8 rounded-full px-4 py-2">
        <FaUser className="text-2xl cursor-pointer text-[#141475] transition-all hover:text-[#7dd3fc] hover:scale-110" />
        <div className="relative">
        <FaShoppingCart
          className="text-2xl cursor-pointer text-[#141475] transition-all hover:text-[#f97316] hover:scale-110"
          onClick={handleCartIconClick}
        />
        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">1</div>
      </div>
      {/* แสดงหรือซ่อน CartDropdown ตามค่า isCartDropdownOpen */}
      {isCartDropdownOpen && <CartDropdown />}
      </div>
    </div>
  );
};

export default OptionBar;
