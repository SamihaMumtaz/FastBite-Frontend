import { Routes, Route, useLocation } from 'react-router-dom';
import StartupAnimation from "./Components/StartupAnimationFastBite";
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Home from './Components/Home/Home';
import LoginPage from './Pages/Auth/LoginPage';
import RegisterPage from './Pages/Auth/RegisterPage';
import ContactPage from './Pages/Navbar/ContactPage';
import AboutPage from './Pages/Navbar/AboutPage';
import LogoutPage from './Pages/Auth/LogoutPage';
import FoodMenu from './Pages/Navbar/FoodMenu';
import MegaMenuPage from './Pages/Navbar/MegaMenuPage';
import HelpPage from './Pages/Footer/HelpPage';
import OurTeamPage from './Pages/Footer/OurTeamPage';
import FAQPage from './Pages/Footer/FAQPage';
import ServicesPage from './Pages/Footer/ServicesPage';
import OrderNow from './Components/Home/OrderNow';
import AllProductDataDetail from './Data/AllProductDataDetail';
import { CartProvider } from './Components/Context/CartContext';
import ScrollToTop from './Components/ScrollToTop';
import BackToTop from './Components/BackToTop';
import Cart from './Pages/Navbar/Cart';
import Dashboard from './Pages/Dashboard/Dashboard';
import ProtectedRoute from './Components/ProtectedRoute';
import AuthRoute from './Components/AuthRoute';
import ForgotPassword from './Pages/Auth/ForgotPassword';
import TermsPage from './Pages/Auth/TermsPage';
import PrivacyPolicyPage from './Pages/Auth/PrivacyPolicyPage';
import OurStoryPage from './Pages/Footer/OurStoryPage';
import BlogPage from './Pages/Footer/BlogPage';
import BlogPostPage from './Pages/Footer/BlogPostPage';

function App() {
  const location = useLocation();
  const hideAuthLayout = location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/forgot-password";

  return (
    <CartProvider>
      <ScrollToTop />
      <StartupAnimation>
        {!hideAuthLayout && <Navbar />}

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/food-menu' element={<FoodMenu />} />
          <Route path='/mega-menu' element={<MegaMenuPage />} />
          <Route path='/item/:id' element={<AllProductDataDetail />} />
          <Route path='/menu-item/:id' element={<AllProductDataDetail />} />
          <Route path='/help' element={<HelpPage />} />
          <Route path='/team' element={<OurTeamPage />} />
          <Route path='/faq' element={<FAQPage />} />
          <Route path='/services' element={<ServicesPage />} />
          <Route path='/logout' element={<LogoutPage />} />
          <Route path='/terms' element={<TermsPage />} />
          <Route path='/privacy' element={<PrivacyPolicyPage />} />
          <Route path="/our-story" element={<OurStoryPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogPostPage />} />

          <Route path='/login' element={
            <AuthRoute>
              <LoginPage />
            </AuthRoute>
          } />
          <Route path='/register' element={
            <AuthRoute>
              <RegisterPage />
            </AuthRoute>
          } />
          <Route path='/forgot-password' element={
            <AuthRoute>
              <ForgotPassword />
            </AuthRoute>
          } />

          <Route path='/ordernow' element={
            <ProtectedRoute>
              <OrderNow />
            </ProtectedRoute>
          } />
          <Route path='/cart' element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          } />
          <Route path='/dashboard/*' element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
        </Routes>

        {!hideAuthLayout && <Footer />}
        <BackToTop />
      </StartupAnimation>
    </CartProvider>
  );
}

export default App;