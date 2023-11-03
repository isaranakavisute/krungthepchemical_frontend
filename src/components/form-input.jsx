/* eslint-disable react/prop-types */


const FormInput = ({ type, name, label, value, handleChange }) => (
  <div className='group relative mt-10'>
    <input
      type={type}
      name={name}
      value={value}
      onChange={handleChange}
      className='bg-white text-gray-400 text-lg py-2 px-2 w-full border-b border-gray-300 focus:outline-none focus:border-[#2e3192]'
    />
    <label
      className={`${
        value ? '-top-4 text-lg text-black' : 'top-2 text-gray-600 text-sm'
      } absolute pointer-events-none left-2 transition-all duration-300`}
    >
      {label}
    </label>
  </div>
);

export default FormInput;

