
import { FaUser, FaShoppingCart, FaHome, FaStore, FaNewspaper, FaEnvelope, FaInfoCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const CombinedNav = () => {
  return (
    <div>
      <nav className="bg-white px-4 w-screen sm:hidden shadow-lg">
          <div className="flex items-center">
            <img src='https://jpthinkofus.com/fiat/sandbox3/logo_poly.png' className="h-24 p-6" alt="Logo" />
            <div className="flex ml-auto space-x-8 rounded-full px-4 py-2">
              <FaUser className="text-2xl cursor-pointer text-[#141475] transition-all hover:text-[#7dd3fc] hover:scale-110" />
              <div className="relative">
                <FaShoppingCart
                  className="text-2xl cursor-pointer text-[#141475] transition-all hover:text-[#f97316] hover:scale-110"
                />
                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">1</div>
              </div>
            </div>
          </div>
      </nav>

      {/* Bottom Bar */}
      <div className='fixed bottom-0 left-0 bg-[#2e3192] w-screen sm:hidden'>
        <ul className="px-8 py-4 flex justify-between">
          <li className='py-2 font-semibold'>
            <Link to="/"><FaHome className='text-2xl text-white hover:text-[#ef4444] transition-all' /></Link>
          </li>
          <li className="py-2 font-semibold">
            <Link to="/shop" className='flex'><FaStore className='text-2xl text-white hover:text-[#ef4444] transition-all' /></Link>
          </li>
          <li className='py-2 font-semibold'>
            <a href="/blog"><FaNewspaper className='text-2xl text-white hover:text-[#ef4444] transition-all' /></a>
          </li>
          <li className='py-2 font-semibold'>
            <Link to="/contact_us" className='flex'><FaEnvelope className='text-2xl text-white hover:text-[#ef4444] transition-all' /></Link>
          </li>
          <li className='py-2 font-semibold'>
            <Link to="/about_us"><FaInfoCircle className='text-2xl text-white hover:text-[#ef4444] transition-all' /></Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CombinedNav;
