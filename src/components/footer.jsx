import { FaCcVisa, FaCcMastercard, FaCcPaypal } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white py-2 text-center mb-0">
      <p className="text-gray-600">&copy; 2023 Krunthepchemi, All Rights Reserved.</p>
      <div className="flex justify-center py-2">
        <FaCcVisa className="text-2xl mx-2" />
        <FaCcMastercard className="text-2xl mx-2" />
        <FaCcPaypal className="text-2xl mx-2" />
      </div>
    </footer>
  );
};

export default Footer;
