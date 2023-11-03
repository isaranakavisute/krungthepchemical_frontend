import { FaAngleDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { logout } from '../redux/auth/auth.actions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

const NavBar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await axios.put('http://localhost:3000/api/signout', { user_id });
      dispatch(logout());
      location.reload();
      navigate('/');
    } catch (error) {
      console.log(error)
    }
  };

const toSignin = () => {
navigate('/signin');

}

return (
  <nav className="bg-white px-48 shadow-lg max-[768px]:hidden py-4">
    <div className="container mx-auto flex items-center justify-between">
      <ul className="flex space-x-4 gap-12 text-sm font-semibold">
        <li className='mt-2'><Link to="/">HOME</Link></li>
        <li className="mt-2"><Link to="/shop" className='flex'>SHOP</Link></li>
        <li className='mt-2'><Link to="/blog">BLOG</Link></li>
        <li className='mt-2'><Link to="/contact_us" className='flex'>CONTACT</Link></li>
        <li className='mt-2'><Link to="/" className='flex'>AFFILIATE</Link></li>
        <li className='mt-2'><Link to="/about_us">ABOUT US</Link></li>
      </ul>
      {isAuthenticated ? (
        <button
          className='rounded-full text-sm text-white bg-red-500 h-full px-2 py-2 transition-all hover:bg-gray-500' // Adjusted margin
          onClick={handleSignOut}
        >
          SIGN OUT
        </button>
      ) : (
        <button
          className='rounded-full text-sm text-white bg-blue-500 h-full px-2 py-2 transition-all hover:bg-gray-500' // Adjusted margin
          onClick={toSignin}
        >
          SIGN IN
        </button>
      )}
    </div>
  </nav>
);
};


export default NavBar;
