import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation  } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import AppRoutes from './routes/AppRoutes';
import CartDrawer from "./components/cart/CartDrawer";
import CheckoutModal from "./components/checkout/CheckoutModal";
import Footer from './components/layout/Footer';
import ScrollToTop from './components/common/ScrollToTop';
import { useCart } from "./context/CartContext";


const Layout = () => {
  const location = useLocation();
  const { checkoutOpen, closeCheckout } = useCart();
  const hideLayoutRoutes = ["/", "/login", "/register"];
  const hideLayout = hideLayoutRoutes.includes(location.pathname);
  return(
    <div className="flex flex-col min-h-screen bg-cream">
      {!hideLayout && <Navbar />}

      <CartDrawer />
      {!hideLayout && (
        <CheckoutModal open={checkoutOpen} onClose={closeCheckout} />
      )}
      <main className="flex-grow pt-16">
          <AppRoutes />
      </main>

      {!hideLayout && <Footer />}
    </div>
  );
};

function App() {
  return (
     /* <Router>
      <div className="flex flex-col min-h-screen bg-cream">
           <Navbar />
           <ScrollToTop />
          <CartDrawer />
          <main className="flex-grow pt-16">
            <AppRoutes />
          </main>
          <Footer />
      </div>
    </Router>*/

    <Router>
          <ScrollToTop />
          <Layout />
    </Router>
  );
}

export default App;
