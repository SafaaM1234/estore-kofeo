import React from 'react';
import { Routes, Route , Navigate} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthChoice from '../pages/AuthChoice';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import Shop from '../pages/Shop';
import Profile from '../pages/Profile';
import Cart from '../pages/Cart';
import DeliveryInfo from "../pages/DeliveryInfo";
import Returns from "../pages/Returns";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import Terms from "../pages/Terms";
import FAQ from "../pages/FAQ";


const AppRoutes = () => {
  const {user , loading } = useAuth();
  if(loading) return <div className="p-10">Loading...</div>
  
  return (
    <Routes>

      {/* ================= AUTH ================= */}
      {!user ? (
        <>
          <Route path="/" element={<AuthChoice />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="*" element={<Navigate to="/" />} />
        </>
      ) : (
        <>
          {/* ================= APP ================= */}
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />

          {/* ================= SUPPORT PAGES ================= */}
          <Route path="/delivery-info" element={<DeliveryInfo />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/returns" element={<Returns />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />

          {/* fallback */}
          <Route path="*" element={<Navigate to="/home" />} />
        </>
      )}

    </Routes>
  );
};

export default AppRoutes;
