import { motion } from 'framer-motion';

const Slider = () => {
  return (
    <div className="flex px-4 sm:px-48 py-8 justify-between my-10">
      <div className="w-2/3">
        <div className="slider-content sm:mt-24 sm:ml-24">
          <motion.h5
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className='text-lg sm:text-6xl m-2'
          >
            BEST DEAL !
          </motion.h5>
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className='text-xl sm:text-5xl m-2 font-black text-[#2e3192]'
          >
            MASK MIX COTTON TATO
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className='text-sm sm:text-base font-semibold mx-2 my-2 sm:my-6'
          >
            Get up to <span className="text-red-500">50%</span> off Today Only
          </motion.p>
          <motion.button
            href="shop-left-sidebar.html"
            className="bg-[#2e3192] text-white ml-2 mt-2 sm:mt-4 px-2 sm:px-4 sm:py-2 transition-all hover:bg-[#737373]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.1, duration: 0.6 }}
            tabIndex="-1"
          >
            Shop Now
          </motion.button>
        </div>
      </div>
      <div className="w-1/3">
        <motion.div
          className="slider-img"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <img src="https://กรุงเทพเคมี.com/image/cache/catalog/Mark%20Scrub%20category%20(X)/X006MC/X006MC-N-550x550.jpg" className="mt-4 w-32 h-32 sm:w-96 sm:h-96" alt="" />
        </motion.div>
      </div>
    </div>
  );
};

export default Slider;
