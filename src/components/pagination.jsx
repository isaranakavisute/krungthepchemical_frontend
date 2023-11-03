
import { FaAngleDoubleRight, FaAngleDoubleLeft } from 'react-icons/fa';

export function DefaultPagination() {
  return (
    <div className="flex items-center sm:gap-4 justify-center mt-12">
      <button className="flex items-center sm:gap-2 p-2">
        <FaAngleDoubleLeft className="h-4 w-4" /> Previous
      </button>
      <div className="flex items-center gap-2">
        <button className="px-4 bg-black text-white">1</button>
        <button className="px-4 bg-gray-200 transition-all hover:bg-white hover:text-black">2</button>
      </div>
      <button className="flex items-center gap-2 p-2">
        Next <FaAngleDoubleRight className="h-4 w-4" />
      </button>
    </div>
  );
}
