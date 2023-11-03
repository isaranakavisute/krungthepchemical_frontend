

const FilterColor = () => {
    return (
      <div className='sm:ml-48 sm:mt-12 mb-2 w-64'>
        <h1 className="text-xl p-4 font-semibold">สี</h1>
        <ul className="list-none flex py-4 justify-center">
        <li className="w-8 h-8 mr-2 rounded-full bg-red-500 cursor-pointer transition-all hover:scale-110"></li>
          <li className="w-8 h-8 mr-2 rounded-full bg-blue-500 cursor-pointer transition-all hover:scale-110"></li>
          <li className="w-8 h-8 mr-2 rounded-full bg-green-500 cursor-pointer transition-all hover:scale-110"></li>
          <li className="w-8 h-8 mr-2 rounded-full bg-yellow-500 cursor-pointer transition-all hover:scale-110"></li>
          <li className="w-8 h-8 mr-2 rounded-full bg-purple-500 cursor-pointer transition-all hover:scale-110"></li>
        </ul>
      </div>
    );
  };
  
  export default FilterColor;
  