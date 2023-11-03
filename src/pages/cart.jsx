// CartPage.js
/* eslint-disable react-hooks/exhaustive-deps */
import { FaMinus } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import axios from "axios"
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Contact from '../components/contact';
import Footer from '../components/footer';
import BurgerNav from '../components/burger-bar';



const CartPage = () => {
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

  useEffect(() => {
    axios.get('http://localhost:3000/api/get-cart', {
      params: { user_id }
    })
      .then((response) => {
        setCartItems(response.data);
      })
      .catch((error) => {
        toast.error("Error fetching cart items.");
        console.error('Error fetching cart items:', error);
      });
  },[]);

  const handleCheckOut = async () => {
    try {
      await axios.post('http://localhost:3000/api/gotoCheckout', {
        user_id,
        cartItems
      });
      toast.success("Proceeded to checkout successfully!");
      setCartItems([]);
      navigate('/profile')
    } catch (error) {
      toast.error("Error proceeding to checkout.");
      console.log(error)
    }
  }

  const totalPrice = cartItems.reduce((total, item) => {
    return total + parseInt(item.price);
  }, 0);

  return (
    <>
    <BurgerNav />
    <div className='flex flex-col shadow-lg bg-white p-8'>
    <h2 className='text-3xl'>CART</h2>
    <ToastContainer />
    <div className='h-screen overscroll-x-none overflow-auto'>
        {cartItems.map((product) => (
            <div key={product.add_id} className='flex items-center p-4 border-b border-gray-200'>
                <img src={`http://krungthepchemi.com/uploads/products/${product.product_img1}`} alt={product.product_name} className='w-24 h-24 object-cover mr-4' />
                <div className='flex-1'>
                    <h3 className='text-lg font-semibold'>{product.product_name}</h3>
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
    <button onClick={handleCheckOut} className='mt-8 bg-black text-white px-8 py-2 hover:bg-white hover:text-black hover:shadow transition duration-300'>
        GO TO CHECKOUT
    </button>
</div>

    <Contact />
    <Footer />
    </>
  );
};

export default CartPage;
