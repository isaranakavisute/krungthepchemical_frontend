import {FaCoins, FaUser, FaShippingFast, FaGift} from 'react-icons/fa'

const FourColumnBar = () => {
    return (
      <div className="bar-container mt-8 mb-4 mx-48 px-48 py-8 flex justify-between max-[768px]:hidden">
        <div className="column flex">
          <FaCoins className='mr-4 text-2xl' />ราคาดี
        </div>
        <div className="column flex">
        <FaUser className='mr-4 text-2xl' />บริการเยี่ยม
        </div>
        <div className="column flex">
        <FaShippingFast className='mr-4 text-2xl' />ขนส่งฉับไว
        </div>
        <div className="column flex">
        <FaGift className='mr-4 text-2xl' />ของแถมอีกมากมาย
        </div>
      </div>
    );
  };
  
  export default FourColumnBar;