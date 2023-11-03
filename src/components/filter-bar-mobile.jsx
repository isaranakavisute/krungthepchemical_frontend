/* eslint-disable react/prop-types */
import { useState } from 'react';

const Categories = ({ isCatOpen, onCatClose }) => {
    return (
        // Add your modal content here
        <div className={`fixed top-40 left-0 w-full z-50 items-center justify-center shadow-xl ${isCatOpen ? 'block' : 'hidden'}`}>
            <div className="modal-container bg-white p-4">
                {/* Add your modal content */}
                <h1 className="text-sm p-4 font-semibold border-b border-solid border-zinc-200">Categories</h1>
                <ul className="list-none text-sm grid grid-cols-3">
                <li><a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">FOOD ADDITIVES<span className="ml-2 text-gray-500">27</span></a></li>
        <li><a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">SWEETENER<span className="ml-2 text-gray-500">12</span></a></li>
        <li><a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">GENERAL CHEMICALS<span className="ml-2 text-gray-500">6</span></a></li>
        <li><a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">ESSENTIAL OIL<span className="ml-2 text-gray-500">7</span></a></li>
        <li><a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">FRAGRANCE<span className="ml-2 text-gray-500">9</span></a></li>
        <li><a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">FOOD FLAVOUR<span className="ml-2 text-gray-500">9</span></a></li>
        <li><a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">NATURAL EXTRACT<span className="ml-2 text-gray-500">9</span></a></li>
        <li><a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">PRODUCT SET<span className="ml-2 text-gray-500">9</span></a></li>
        <li><a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">OILS & NATURAL OIL<span className="ml-2 text-gray-500">9</span></a></li>
        <li><a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">PACKAGING<span className="ml-2 text-gray-500">9</span></a></li>
        <li><a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">PERFUME MEN<span className="ml-2 text-gray-500">9</span></a></li>
        <li><a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">PERFUME WOMEN<span className="ml-2 text-gray-500">9</span></a></li>
        <li><a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">FABRIC SOFTENER<span className="ml-2 text-gray-500">9</span></a></li>
        <li><a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">COSMETIC COLOR<span className="ml-2 text-gray-500">9</span></a></li>
        <li><a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">FOOD COLORING<span className="ml-2 text-gray-500">9</span></a></li>
        <li><a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">FACIAL MASK<span className="ml-2 text-gray-500">9</span></a></li>
        <li><a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">SCRUB<span className="ml-2 text-gray-500">9</span></a></li>
        <li><a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">CREAM BASE<span className="ml-2 text-gray-500">9</span></a></li>
        <li><a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">POWDER FLAVOUR<span className="ml-2 text-gray-500">9</span></a></li>
        <li><a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">FOOD COLORING<span className="ml-2 text-gray-500">9</span></a></li>
        <li><a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">FACIAL MASK<span className="ml-2 text-gray-500">9</span></a></li>
        <li><a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">SCRUB<span className="ml-2 text-gray-500">9</span></a></li>
        <li><a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">CREAM BASE<span className="ml-2 text-gray-500">9</span></a></li>
        <li><a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">POWDER FLAVOUR<span className="ml-2 text-gray-500">9</span></a></li>
        <li><a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">KETOGENIC<span className="ml-2 text-gray-500">9</span></a></li>
        <li><a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">CLEANER PRODUCT<span className="ml-2 text-gray-500">9</span></a></li>
        <li><a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">CERIAL GRAIN<span className="ml-2 text-gray-500">9</span></a></li>
        <li><a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">J RAW MIXED<span className="ml-2 text-gray-500">9</span></a></li>
                </ul>
                <button onClick={onCatClose} className="ml-auto mt-4 px-4 py-2 bg-black text-white text-xs hover:bg-white hover:text-black">
                    Close
                </button>
            </div>
        </div>
    );
};


const FilterBar = () => {
    const [isCatOpen, setIsCatOpen] = useState(false);


    const openCat = () => {
        setIsCatOpen(true);
    };

    const closeCat = () => {
        setIsCatOpen(false);
    };
  
    return (
        <div className="flex p-4 py-2 justify-center bg-white sm:hidden">
            <button
                onClick={openCat}
                className="w-auto mx-2 px-4 py-2 bg-black text-white text-xs transition-all hover:bg-white hover:text-black"
            >
                Categories
            </button>
  
            <Categories isCatOpen={isCatOpen} onCatClose={closeCat} />
        </div>
    )
}

export default FilterBar;