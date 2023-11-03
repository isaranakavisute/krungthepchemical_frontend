

const FilterTab = () => {
    return (
      <div className='ml-48 mt-12 mb-2 w-64'>
        <h1 className="text-xl p-4 font-semibold">ราคา</h1>
        <ul className="list-none text-sm">
        <li className="block px-4 py-2"><input type='checkbox' className='mr-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded'/>1,000-5,000 BATH</li>
          <li className="block px-4 py-2"><input type='checkbox' className='mr-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded'/>5,001-10,000 BATH</li>
          <li className="block px-4 py-2"><input type='checkbox' className='mr-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded'/>10,001-15,000 BATH</li>
          <li className="block px-4 py-2"><input type='checkbox' className='mr-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded'/>15,001-20,000BATH</li>
        </ul>
      </div>
    );
  };
  
  export default FilterTab;
  