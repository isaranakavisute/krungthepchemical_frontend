import { useState } from 'react';
import FormInput from './form-input';

const ContactUs = () => {
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [messageValue, setMessageValue] = useState('');

  const handleNameChange = (e) => {
    setNameValue(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmailValue(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessageValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
  };

  return (
    <div className="px-4 sm:px-4 md:px-2 lg:px-30 xl:px-48">
      <h2 className="text-3xl font-semibold mt-12 mb-8 text-[#2e3192]">CONTACT US</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-20">
          <FormInput
            type="text"
            name="name"
            label="Name"
            value={nameValue}
            handleChange={handleNameChange}
          />
        </div>

        <div className="mb-20">
          <FormInput
            type="email"
            name="email"
            label="Email"
            value={emailValue}
            handleChange={handleEmailChange}
          />
        </div>

        <div className="mb-20">
          <FormInput
            type="textarea"
            name="message"
            label="Message"
            value={messageValue}
            handleChange={handleMessageChange}
          />
        </div>

        <div className="my-20">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-[#2e3192] text-white transition-colors hover:shadow hover:bg-white hover:text-[#2e3192]"
          >
            ส่งข้อความ
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactUs;
