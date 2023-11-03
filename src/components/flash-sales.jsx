/* eslint-disable react/prop-types */
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

const CustomCard = ({ data }) => {
    return (
        <div className="flex bg-white mt-8 cursor-pointer transition-all hover:shadow">
            <div className="w-1/3 h-full">
                <img src={data.image} alt={data.title} className="w-full h-full object-contain" />
            </div>
            <div className="w-2/3 ml-4 py-2">
                <h2 className="text-base sm:text-xl font-bold">{data.title}</h2>
                <div className="flex items-center mt-2">
                <div className="flex">
            <FaStar className="text-yellow-500" />
            <FaStar className="text-yellow-500" />
            <FaStar className="text-yellow-500" />
            <FaStar className="text-yellow-500" />
            <FaStarHalfAlt className="text-yellow-500" />
          </div>
                </div>
                <p className="text-xs sm:text-sm font-bold mt-2 line-through text-gray-500">{data.fullprice} BATH</p>
                <p className="text-sm sm:text-lg font-bold mt-2 text-red-500">{data.price} BATH</p>
                <p className="text-gray-500 text-xs sm:text-sm mt-4">{data.subtitle}</p>

            </div>
        </div>
    );
}

const FlashSale = () => {
    // ข้อมูลของแต่ละ Card
    const flashSaleData = [
        {
            image: 'https://กรุงเทพเคมี.com/image/cache/catalog/Mark%20Scrub%20category%20(X)/X001MG/X001MG-N-550x550.jpg',
            title: 'Mask Foil Gold',
            subtitle: 'แผ่นมาร์ค ทองคำ นำไปใช้ใส่สารสำคัญต่างๆ ได้ ผิวฟอยด์ด้านนอก ทำจากแผ่นฟอยด์ที่เก็บความร้อนและป้องกันการระเหยของสาร ผิวด้านใน ทำจาก ฝ้าย ด้วยกลไก ของ SPA Micropressure',
            fullprice: "3,000",
            price: "2,000",

        },
        {
            image: 'https://กรุงเทพเคมี.com/image/cache/catalog/Cerial%20Grain%20(K)/K002FS/K002FS-100G-2-550x550.jpg',
            title: 'Flax Brown Seed',
            subtitle: 'เมล็ดแฟลกซ์ (Flax Seed) เป็นเมล็ดพืชขนาดเล็กที่ได้จากต้นแฟลกซ์ มีทั้งชนิดสีน้ำตาลและสีทอง เป็นธัญพืชที่หลายคนนิยมนำมารับประทานเนื่องจากอุดมไปด้วยสารอาหารต่าง ๆ',
            fullprice: "9,000",
            price: "1,000",
        },
    ];

    return (
        <div className=" w-11/12 sm:w-auto mt-2 mb-8 sm:mb-40 px-auto sm:px-48">
        <div className='block text-center px-auto'>
            <h1 className="text-4xl py-2 w-full font-black text-red-500">
            SUPER DEALS</h1> 
            <span className='text-lg text-orange-500'>END IN</span>
            <div className='ml-8 text-2xl font-bold'>
            2<span className='mx-2'>H</span>
            39<span className='mx-2'>M</span>
            59<span className='mx-2'>S</span>
            </div>
            </div>
            
            <div className="sm:grid grid-cols-2 gap-4 mx-4 mb-4">
                {flashSaleData.map((item, index) => (
                    <CustomCard key={index} data={item} />
                ))}
            </div>
        </div>
    );
}

export default FlashSale;
