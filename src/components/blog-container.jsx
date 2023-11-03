/* eslint-disable react/prop-types */
import { DefaultPagination } from "./pagination";

const BlogItem = ({ image, title, description }) => {
  return (
    <div className="bg-[#fafafa] overflow-hidden flex cursor-pointer my-8 transition-all">
    <div className="w-96 h-56">
      <img src={image} alt={title} className="w-full h-full object-cover" />
    </div>
      
      <div className="p-4">
        <h2 className="text-small sm:text-xl font-semibold">{title}</h2>
        <p className="mt-2 text-gray-600 text-xs sm:text-base">{description && description.length > 50 ? `${description.slice(0, 50)}...` : description}</p>
      </div>
    </div>
  );
};

const BlogContainer = () => {
  return (
    <div className="mx-4 sm:mx-4 md:mx-4 lg:mx-4 xl:mx-48 my-8">
      <h2 className="text-4xl font-bold mb-4 text-[#2e3192]">BLOG</h2>
      <BlogItem
        image="https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        title="วิธีการสั่งซื้อ"
        description=" สำหรับการสั่งสินค้าใส่ตระกร้า สามารถทำได้ดังนี้เลือกสินค้าที่ต้องการสั่งซื้อเลือกขนาดสินค้า และจำนวนสินค้าที่ต้องการกดที่ ปุ่ม เพิ่มในตะกร้าสินค้า หรือ กดปุ่ม BUY NOW  เพื่อซื้อสินค้าสำหรับการสั่งสิน.."
      />
      <BlogItem
        image="https://images.pexels.com/photos/11154572/pexels-photo-11154572.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        title="9 สารให้ความหวานทดแทนน้ำตาลที่พบได้บ่อย มีอะไรบ้าง แต่ละชนิดแตกต่างกันอย่างไร ?"
        description="สารให้ความหวานทดแทนน้ำตาล สำหรับผู้ป่วยด้วยโรคเบาหวานหรือแม้แต่ผู้ที่ต้องการลดน้ำตาลในร่างกาย การเลือกใช้สารทดแทนความหวานถือเป็นตัวเลือกหนึ่งที่ค่อนข้างปลอดภัยต่อสุขภาพค่ะ เพราะสารทดแทนความหวาน.."
      />
      <BlogItem
        image="https://images.pexels.com/photos/6348105/pexels-photo-6348105.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        title="เช็คพัสดุ ไปรษณีย์ - Postal check"
        description="..."
      />
      <BlogItem
        image="https://vos.line-scdn.net/strapi-cluster-instance-bucket-84/2_a967c3ea28.png"
        title="วิธีชำระเงิน-Rabbit line pay"
        description="..."
      />
      <BlogItem
        image="https://xn--12cgi8d9atj3mva5fc.com/image/cache/catalog/File%20Test/MCT%20Oil/MCT-PNG-400x250w.jpg" srcset="https://xn--12cgi8d9atj3mva5fc.com/image/cache/catalog/File%20Test/MCT%20Oil/MCT-PNG-400x250w.jpg 1x, https://xn--12cgi8d9atj3mva5fc.com/image/cache/catalog/File%20Test/MCT%20Oil/MCT-PNG-800x500w.jpg 2x"
        title="MCT Oil กับ การทำคีโต"
        description="MCT Oil กับ การทำคีโต• Keto Diet (กินไขมันเพื่อลดไขมัน)คือ วิธีการลดน้ำหนักที่เน้นกินอาหารไขมันสูง กินโปรตีนให้น้อยกว่าไขมัน และ หลีกเลี่ยงการกินคาร์โบไฮเดรต เพื่อให้ร่างกายเข้าสู่ภาวะคีโตซิส (Ketosis.."
      />
      <BlogItem
        image="https://images.pexels.com/photos/4041391/pexels-photo-4041391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        title="10 น้ำมันหอมระเหย แก้นอนกรน หลับสนิท"
        description="น้ำมันหอมระเหยช่วยลดอาการนอนกรนได้ ?  น้ำมันหอมระเหยเกรดบำบัด คือน้ำมันหอมระเหยแท้ ที่มีกระบวนการในการปลูก เก็บเกี่ยว และสกัดน้ำมันจากพืช โดยให้คงสารอินทรีย์ที่มีสรรพคุณในการช่วยบำบัดไว้มากที่สุดอโร.."
      />
      <BlogItem
        image="https://images.pexels.com/photos/3735773/pexels-photo-3735773.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        title="BCAAs"
        description="BCAAs (Branched Chain Amino Acids) คืออะไร ?BCAA (Branched Chain Amino Acid) คือ กรดอะมิโน (หน่วยย่อยของโปรตีน) ที่มีโครงสร้างโมเลกุลมีกิ่งก้าน (branch) ประกอบด้วยกรดอะมิโน 3 ชนิด คือ ลิวซีน (leucine).."
      />
      <BlogItem
        image="https://images.pexels.com/photos/260405/pexels-photo-260405.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        title="Essential Oil คืออะไร ?"
        description="Essential Oil คืออะไร ?Essential Oil หรือ น้ำมันหอมระเหย เป็นน้ำมันจากธรรมชาติที่พืชผลิตขึ้น สามารถสกัดได้จากทั้งดอก ใบ ผล ลำต้น หรือยาง โดยจะสกัดได้จากการใช้ความร้อนและได้เป็นของเหลวออกมาคุณสมบัติของ.."
      />
      <BlogItem
        image="https://images.pexels.com/photos/4482900/pexels-photo-4482900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        title="วิธีชำระเงิน"
        description="ปัจจุบัน ลูกค้าสามารถเลือกชำระเงินได้ 2 ช่องทางได้แก่ ผ่านทาง โอนผ่านธนาคาร และ บัตรเครดิต/เดบิตวิธีการชำระเงินสามารถเลือกได้หลักจากเลือกสถานที่จัดส่ง ดังภาพด้านล่างนะคะช่องทางการชำระเงิน หากเลือก.."
      />
      <BlogItem
        image="https://images.pexels.com/photos/4246118/pexels-photo-4246118.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        title="บริษัทขนส่ง"
        description="Post officePay the shipping fee according to the price according to the table below.Express Parcels (EMS) can track parcels through the Internet.Registered Parcel (REG) can track parcels through the I.."
      />
      <DefaultPagination />
    </div>
  );
};

export default BlogContainer;
