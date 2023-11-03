/* eslint-disable react/prop-types */

const news = [
  { imageUrl: 'https://กรุงเทพเคมี.com/image/cache/catalog/File%20Test/Box%20transport/TM-8-1108x1478.png', title: 'Record-Breaking Heatwave Sweeps Across Western Europe', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin euismod rutrum ante, vel iaculis diam tristique et.' },
  { imageUrl: 'https://กรุงเทพเคมี.com/image/cache/catalog/File%20Test/Box%20transport/TM-1-1-1108x1478.png', title: 'New Study Reveals Surprising Health Benefits of Dark Chocolate', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin euismod rutrum ante, vel iaculis diam tristique et.' },
  { imageUrl: 'https://กรุงเทพเคมี.com/image/cache/catalog/File%20Test/Box%20transport/TM-7-1108x1478.png', title: 'Local Community Comes Together to Clean Up Park', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin euismod rutrum ante, vel iaculis diam tristique et.' },
  { imageUrl: 'https://กรุงเทพเคมี.com/image/cache/catalog/File%20Test/Box%20transport/TM-6-1108x1478.png', title: 'Innovative Startup Launches Electric Car', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin euismod rutrum ante, vel iaculis diam tristique et.' },
  // เพิ่มข้อมูลสินค้าเพิ่มเติม
];

const NewsCard = ({ news }) => {
    return (
      <div className="card-container flex flex-col relative w-auto sm:w-full h-full bg-white mx-2 sm:mx-auto">
        <img src={news.imageUrl} alt={news.title} className="w-full h-40 object-cover" />
        <div className="p-4">
          <h2 className="text-base sm:text-lg font-semibold mb-2">{news.title}</h2>
        </div>
        <button className="w-full sm:w-auto text-sm px-4 py-2 text-white sm:rounded-full mb-0 sm:mb-4 bg-[#2e3192] transition-colors hover:shadow hover:bg-white hover:text-black self-center">
        Read more
      </button>
      </div>
    );
  };
  

const LatestNews = () => {
  return (
    <div className="sm:mx-4 md:mx-4 lg:mx-4 xl:mx-48 px-4 mt-12 pb-12 w-11/12 sm:w-auto bg-[#fafafa]">
    <h1 className="text-2xl p-2 mb-2 font-bold">Reviews</h1>
    <div className="grid sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-8 justify-center">
      {news.map((news, index) => (
        <NewsCard key={index} news={news} />
      ))}
    </div>
    </div>
  );
};

export default LatestNews;
