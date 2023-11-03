
import { Link } from 'react-router-dom';

const ThreeCard = () => {
  // ข้อมูลของแต่ละการ์ด
  const cardsData = [
    {
      backgroundImg: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'วิธีการสั่งซื้อ',
      subtitle: 'สำหรับการสั่งสินค้าใส่ตระกร้า สามารถทำได้ดังนี้เลือกสินค้าที่ต้องการสั่งซื้อเลือกขนาดสินค้า...',
      buttonLabel: 'ดูรายละเอียด',
      link: '/'
    },
    {
      backgroundImg: 'https://images.pexels.com/photos/4246118/pexels-photo-4246118.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'อัตราค่าขนส่ง',
      subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      buttonLabel: 'ดูรายละเอียด',
      link: '/'
    },
    {
      backgroundImg: 'https://images.pexels.com/photos/164527/pexels-photo-164527.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'นโยบายการคืนเงิน',
      subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      buttonLabel: 'ดูรายละเอียด',
      link: '/refund'
    }
  ];

  return (
    <div className="sm:mx-48 w-auto px-4 sm:px-0 mt-8">
      <div className='block sm:grid grid-cols-3 gap-2'>
        {cardsData.map((card, index) => (
          <div key={index} className='relative bg-cover bg-center h-64 transition-all mt-4 sm:mt-0'>
            <img src={card.backgroundImg} alt={card.title} className='w-full h-full' />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className='absolute inset-0 flex flex-col justify-between p-4 bg-transparent mt-12'>
              <div>
                <h2 className='text-2xl font-bold text-white mt-2'>{card.title}</h2>
                <p className='text-sm text-gray-200 mt-2 mb-8'>{card.subtitle}</p>
                <Link to={card.link} className='rounded-full text-sm text-white bg-[#2e3192] px-4 py-2 transition-colors hover:bg-white hover:text-[#2e3192]'>
                  {card.buttonLabel}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ThreeCard;
