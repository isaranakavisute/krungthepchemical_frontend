import CookieConsent from 'react-cookie-consent';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/homepage';
import ShopPage from './pages/shop';
import ContactPage from './pages/contact';
import AboutUsPage from './pages/about';
import BlogPage from './pages/blog';
import CartPage from './pages/cart';

import getPublicRoutes from './routes/PublicRoutes';
import protectedRoutes from './routes/ProtectedRoutes';

import './assets/css/remixicon.css';

// Import SCSS
import './App.css';
import './scss/style.scss';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import AdminPageSignin from './dashboard/Signin';
import OtpVerify from './pages/otp-verify';
import ProfilePage from './pages/profile';
import TrackingPage from './pages/tracking';
import ForgotPassword from './pages/ForgotPassword';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const permission = useSelector((state) => state.auth.currentUser?.permission);
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/contact_us" element={<ContactPage />} />
        <Route path="/about_us" element={<AboutUsPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/cart" element={isAuthenticated ? <CartPage /> : <Navigate to="/" />} />
        <Route path='/signup' element={isAuthenticated ? <Navigate to="/" /> : <Signup />} />
    <Route path='/signin' element={isAuthenticated ? <Navigate to="/" /> : <Signin />} />
        <Route path='/otp-verify/:user_id' element={isAuthenticated ? <Navigate to="/" /> : <OtpVerify />} />
        <Route path="/profile" element={isAuthenticated ? <ProfilePage /> : <Navigate to="/" />} />
        <Route path="/forgot" element={isAuthenticated ? <Navigate to="/" /> : <ForgotPassword />} />
        <Route path="/tracking" element={<TrackingPage />} />

        <Route path="/admin/signin" element={<AdminPageSignin />} />


        {protectedRoutes.map((route, index) => (
  <Route
    path={route.path}
    element={
      isAuthenticated && permission === 'admin'
        ? <Navigate to="/admin/signin" />
        : route.element
    }
    key={index}
  />
))}
        {getPublicRoutes.map((route, index) => (
          <Route path={route.path} element={route.element} key={index} />
        ))}
      </Routes>

      <CookieConsent
        location="bottom" // ตำแหน่งของแถบการยินยอม (bottom, top)
        enableDeclineButton
        buttonText="ยอมรับ" // ข้อความบนปุ่มยอมรับ
        declineButtonText="ปฏิเสธ"
        cookieName="myCookieConsent" // ชื่อคุกกี้ที่ใช้เก็บสถานะการยินยอม
        style={{ background: '#2B373B' }} // สไตล์ของแถบ
        buttonStyle={{
    background: '#3b82f6',
    color: 'white',
    borderRadius: '8px', // ปรับรูปแบบของปุ่มเป็นมาตรฐาน iOS
    padding: '10px 20px', // ปรับขนาดของปุ่ม
    fontSize: '16px', // ปรับขนาดตัวอักษรของปุ่ม
    border: 'none', // ลบเส้นขอบ
  }}
  declineButtonStyle={{
    borderRadius: '8px', // ปรับรูปแบบของปุ่มเป็นมาตรฐาน iOS
    padding: '10px 20px', // ปรับขนาดของปุ่ม
    fontSize: '16px', // ปรับขนาดตัวอักษรของปุ่ม
    border: 'none', // ลบเส้นขอบ
  }}
        flipButtons="true"
        expires={150} // ระยะเวลาการเก็บคุกกี้ (วัน)
      >
      เราใช้คุกกี้เพื่อประสบการณ์การใช้งานที่ดีขึ้น <br />
      <span style={{ fontSize: "12px" }}>โดยการใช้งานเว็บไซต์นี้
  คุณยอมรับนโยบายคุกกี้ของเรา. คุณสามารถเลือกปฏิเสธการใช้คุกกี้ได้
  โดยคลิกที่ปุ่ม `ปฏิเสธ` หากคุณไม่ต้องการให้ใช้คุกกี้.</span>
      </CookieConsent>
    </>
  );
}

export default App;
