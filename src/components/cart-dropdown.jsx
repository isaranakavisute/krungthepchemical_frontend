/* eslint-disable react-hooks/exhaustive-deps */
import { FaMinus } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import axios from "axios"
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CartDropdown = () => {
  const [cartItems, setCartItems] = useState([]);
  const user_id = useSelector((state) => state.auth.currentUser?.user_id);
  const navigate = useNavigate();

  const handleDelete = (addId) => {
    axios
      .delete('http://localhost:3000/api/delete-from-cart', {
        data: { user_id, add_id: addId }
      })
      .then((response) => {
        if (response.data.message === 'Item deleted from the cart.') {
          // Update the cartItems state to filter out the deleted item
          setCartItems((prevItems) => prevItems.filter(item => item.add_id !== addId));
        }
      })
      .catch((error) => {
        console.error('Error deleting product from cart:', error);
      });
  };
  
  const getCart = () => {
    axios.get('http://localhost:3000/api/get-cart', {
      params: { user_id }
    })
      .then((response) => {
        setCartItems(response.data);
      })
      .catch((error) => {
        console.error('Error fetching cart items:', error);
      });
  }

  useEffect(() => {
    getCart();
  },[]);

  const handleCheckOut = async () => {
    try {
      await axios.post('http://localhost:3000/api/gotoCheckout', {
        user_id,
        cartItems
      });
      setCartItems([]);
      navigate('/profile')
    } catch (error) {
      console.log(error)
    }
  }

  const totalPrice = cartItems.reduce((total, item) => {
    return total + parseInt(item.price);
  }, 0);
  return (
    <div className='absolute w-96 h-auto flex flex-col shadow-lg bg-white top-24 right-52 z-50'>
      <div className='h-72 overscroll-x-none overflow-auto'>
        {cartItems.map((product) => (
          <div key={product.add_id} className='flex items-center p-4'>
            <img src={`http://krungthepchemi.com/uploads/products/${product.product_img1}`} alt={product.product_name} className='w-16 h-16 object-cover mr-4' />
            <div className='w-2/3'>
              <h3 className='text-base font-semibold'>{product.product_name}</h3>
              <p className='text-gray-500 text-sm'>{parseInt(product.price).toLocaleString()} ฿</p>
            </div>
            <button className='text-gray-500' onClick={() => handleDelete(product.add_id)}>
              <FaMinus />
            </button>
          </div>
        ))}
      </div>
      <div className='flex justify-between items-center px-4 py-2'>
        <span className='font-semibold'>Total:</span>
        <span>{totalPrice.toLocaleString()} ฿</span>
      </div>
      <button onClick={handleCheckOut} className='bg-[#2e3192] text-white px-4 py-2 mb-0 hover:bg-white hover:text-black hover:shadow transition duration-300'>
        GO TO CHECKOUT
      </button>
    </div>
  );
};

export default CartDropdown;
