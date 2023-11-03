import { FaFacebook, FaYoutube, FaLine } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="bg-white py-4 px-4 sm:py-8 sm:px-4">
      <div className="container mx-auto">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
      <div className='block'>
      <img src="https://jpthinkofus.com/fiat/sandbox3/logo_1.png" 
        className="h-24 sm:h-36" alt="Logo" />
        <div className='flex gap-4 sm:gap-4 ml-4 mt-8 sm:ml-0'>
            <a href='https://www.facebook.com/profile.php?id=100084305041413&mibextid=ZbWKwL' className='text-lg sm:text-3xl text-[#0866ff]'><FaFacebook /></a>
            <a href='https://www.youtube.com/@krungthepchemi63' className='text-lg sm:text-3xl text-[#f52500]'><FaYoutube /></a>
            <a href='https://line.me/ti/p/~@bkkchemi' className='text-lg sm:text-3xl text-[#3db111]'><FaLine /></a>
        </div>
        </div>
          <div className="text-left">
            <h3 className="text-lg sm:text-xl font-semibold mb-0 sm:mb-2">Information</h3>
            <ul className="text-[#18181b]">
              <li className='flex py-px text-xs sm:text-base'>
              73 ถนนอยู่เย็น (รามอินทรา 34)  แขวงลาดพร้าว เขตลาดพร้าว   กรุงเทพมหานคร 10230
                </li>
              <li className='flex py-px mt-2 text-xs sm:text-base'><a href="tel:0930383875">093-038-3875</a></li>
              <li className='flex py-px text-xs sm:text-base'><a href="tel:0972486027">02-015-6262</a></li>
              <li className='flex py-px text-xs sm:text-base'>Sale@krungthepchemi.com</li>
              <li className='flex py-px text-xs sm:text-base'>LINE: @BKKCHEMI</li>
            </ul>
          </div>
          <div className="text-left sm:ml-24">
            <h3 className="text-lg sm:text-xl font-semibold mb-0 sm:mb-2">บริการลูกค้า</h3>
            <ul className="text-[#18181b]">
              <li className='text-xs sm:text-lg'><a href=''>เคมีอาหาร</a></li>
              <li className='text-xs sm:text-lg'><a href=''>เคมีเครื่องสำอาง</a></li>
              <li className='text-xs sm:text-lg'><a href=''>เคมีทั่วไป</a></li>
              <li className='text-xs sm:text-lg'><a href=''>น้ำมันหอมระเหย</a></li>
              <li className='text-xs sm:text-lg'><a href=''>วิธีการชำระเงิน</a></li>
              <li className='text-xs sm:text-lg'><a href=''>วิธีการสั่งซื้อ</a></li>
            </ul>
          </div>
          {/* ช่องใส่อีเมล์ */}
          <div className="text-center mt-4">
            <h3 className="text-sm sm:text-xl font-semibold mb-0 sm:mb-8">ลงทะเบียนติดตามข่าวสาร</h3>
            <div className="mt-2 flex">
              <input
                type="email"
                placeholder="กรอกอีเมลของท่าน"
                className="px-3 w-full border border-gray-300 focus:outline-none focus:none focus:white"
              />
              <button
                className="bg-[#2e3192] text-white px-2 sm:px-4 py-2 transition-colors hover:bg-white hover:text-[#2e3192]"
              >
                ติดตาม
              </button>
            </div>
              <div className='flex gap-2 mt-8 justify-end'>
           <img src="https://กรุงเทพเคมี.com/image/cache/catalog/File%20Test/pay/bangkok%20bank100-100x100.png" className="w-8 rounded" />
           <img src="https://กรุงเทพเคมี.com/image/cache/catalog/File%20Test/pay/kasikorn%20Bank100-100x100.png" className="w-8 rounded" />
           <img src="https://กรุงเทพเคมี.com/image/cache/catalog/File%20Test/pay/krungsri%20bank100-100x100.png" className="w-8 rounded" />
           <img src="https://กรุงเทพเคมี.com/image/cache/catalog/File%20Test/pay/SCB100-100x100.png" className="w-8 rounded" />
        </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
