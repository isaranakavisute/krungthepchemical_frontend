import BurgerBar from '../components/burger-bar'
import OptionBar from '../components/option-bar';
import MiniHeader from '../components/mini-header';
import NavBar from '../components/navbar';
import Contact from '../components/contact';
import Footer from '../components/footer';
import { FaEnvelope, FaLine, FaFacebook, FaPhone, FaMapPin } from 'react-icons/fa';
// Import BurgerNav if it's available

const AboutUsPage = () => {
  return (
    <>
      <MiniHeader />
      <OptionBar />
      <div className="sticky top-0 z-50">
        <NavBar />
        <BurgerBar />
      </div>
      <main>
        <section className="py-4 sm:py-16 text-center sm:text-left">
          <div className="container mx-auto px-4 sm:px-0">
            <div className="text-center">
              <h2 className="text-xl sm:text-4xl font-bold mb-4 text-[#2e3192]">ABOUT US</h2>
            </div>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 sm:gap-12">
              <div className="flex items-center">
                <img
                  src="https://กรุงเทพเคมี.com/image/catalog/File%20Test/KC%20copy.png"
                  alt="Our Furniture"
                  className="w-full md:w-2/3 mx-auto"
                />
              </div>
              <div className="my-auto">
                <p className="py-2">
                  เราเป็นผู้นำเข้า และจำหน่ายเคมีภัณฑ์สำหรับผลิตสินค้า
                </p>
                <p className='mb-8'>
                  เช่น วัตถุเจือปนอาหาร
                  เคมีภัณฑ์เครื่องสำอางและน้ำมันหอมระเหยที่เป็นที่นิยมในปัจจุบันเคมีอุตสาหกรรมสำหรับการผลิตผลิตภัณฑ์ต่างๆในอุตสาหกรรมทั่วไป
                </p>
                <h2 className="text-xl sm:text-2xl font-semibold mb-4">ข้อมูลติดต่อ</h2>
                <span className='flex px-2'>
                <FaMapPin className='mr-4 text-2xl text-[#2e3192]' />
                  <a href='https://www.google.com/maps?rlz=1C1YTUH_thTH1073TH1073&vet=12ahUKEwijo8TFgeeBAxWNg2MGHWSHCyUQ8UF6BAg_EAI..i&lei=rusiZaOUBY2HjuMP5I6uqAI&cs=1&um=1&ie=UTF-8&fb=1&gl=th&sa=X&geocode=Kakw782mYx0xMU6socjgGMcw&daddr=73+%E0%B8%96%E0%B8%99%E0%B8%99+%E0%B8%AD%E0%B8%A2%E0%B8%B9%E0%B9%88%E0%B9%80%E0%B8%A2%E0%B9%87%E0%B8%99+%E0%B9%81%E0%B8%82%E0%B8%A7%E0%B8%87%E0%B8%A5%E0%B8%B2%E0%B8%94%E0%B8%9E%E0%B8%A3%E0%B9%89%E0%B8%B2%E0%B8%A7+%E0%B9%80%E0%B8%82%E0%B8%95%E0%B8%A5%E0%B8%B2%E0%B8%94%E0%B8%9E%E0%B8%A3%E0%B9%89%E0%B8%B2%E0%B8%A7+%E0%B8%81%E0%B8%A3%E0%B8%B8%E0%B8%87%E0%B9%80%E0%B8%97%E0%B8%9E%E0%B8%A1%E0%B8%AB%E0%B8%B2%E0%B8%99%E0%B8%84%E0%B8%A3+10230'>
                  73 ถนน อยู่เย็น (รามอินทรา 34) แขวงลาดพร้าว เขตลาดพร้าว กรุงเทพมหานคร 10230
                  </a>
                  </span>
                  <br />
                  <span className='flex p-2'>
                  <FaPhone className='mr-4 text-2xl text-[#2e3192]' />
                  <a href='tel:+66930383875' className='pr-4'>093-038-3875</a> ,
                  <a href='tel:+66972486027' className='px-4'>097-248-6027</a> ,
                  <a href='tel:+6620156262' className='px-4'>02-015-6262</a>
                  </span>
                  <span className='flex p-2'><FaEnvelope className='mr-4 text-3xl text-[#2e3192]' />Sale@krungthepchemi.com</span>
                  <a href='https://line.me/ti/p/~@bkkchemi' className='flex p-2'><FaLine className='mr-4 text-3xl text-[#42c152]' />@Bkkchemi</a>
                  <a href='https://www.facebook.com/bkkchemi' className='flex p-2'><FaFacebook className='mr-4 text-3xl text-[#0866ff]' />กรุงเทพเคมี จำหน่ายเคมีภัณฑ์</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Contact />
      <Footer />
    </>
  );
};

export default AboutUsPage;
