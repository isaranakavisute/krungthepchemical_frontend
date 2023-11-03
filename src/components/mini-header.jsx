import { FaPhone, FaEnvelope, FaAngleDown } from 'react-icons/fa';

const MiniHeader = () => {
  return (
    <div className="bg-white py-[4px] text-[#22287c] px-48 max-[768px]:hidden">
      <ul className="list-none font-bold">
        <li className="inline-block mr-6 text-xs">
        <a href="tel:020341515" className='flex'>
        <FaPhone className='mr-2 mt-px' />02-034-1515
        </a>
        </li>
        <li className="inline-block mr-6 text-xs">
        <a href="tel:020156262" className='flex'>
        <FaPhone className='mr-2 mt-px' />02-015-6262
        </a>
        </li>
        <li className="inline-block mr-4 text-xs">
          <a href="" target="_blank" rel="noreferrer" className='flex'>
            <FaEnvelope className='mr-2 mt-px' /> <span>sale@krungthepchemi.com</span>
          </a>
        </li>
        <li className="mt-[3px] ml-4 inline-block text-xs float-right">
          <a href="" target="_blank" rel="noreferrer">
            BATH
          </a>
        </li>
        <li className="mt-[3px] inline-block text-xs float-right flex">
          <a href="" target="_blank" rel="noreferrer" className='flex'>
            TH<FaAngleDown className='' />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default MiniHeader;
