/* eslint-disable react/prop-types */

const SaleCard = ({ title, subTitle, subTitle2, imageUrl }) => {
  return (
    <div className="card-container bg-cover bg-center h-72 w-64 relative ml-48 mt-2 mb-2" style={{ backgroundImage: `url(${imageUrl})`}}>
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="card-content absolute bottom-5 left-20 text-white text-center">
        <p className="text-sm">{subTitle}</p>
        <h2 className="text-lg font-bold">{title}</h2>
        <a href="" className="text-sm text-red-500">{subTitle2}</a>
      </div>
    </div>
  );
};

export default SaleCard;
