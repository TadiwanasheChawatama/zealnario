import {
  RouterProvider,
  Router,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import CollectionsPage from "./pages/CollectionsPage";
import CollectionPage from "./pages/CollectionPage";
import ContactPage from "./pages/ContactPage";
import ProductsPage from "./pages/ProductsPage";
import ShoppingPage from "./pages/ShoppingPage";
import SustainabilityPage from "./pages/SustainabilityPage";
import NewArrivalsPage from "./pages/NewArrivalsPage";
import ProductPage from "./pages/ProductPage";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import GalleryPage from "./pages/GalleryPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ResetPassword from "./pages/ResetPassword"
import ForgotPassword from "./pages/ForgotPassword"
import EventsPage from "./pages/EventsPage";
import PromotionsPage from "./pages/PromotionsPage";

const App = () => {

  const route = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/categories/:categoryId" element={<ProductsPage />} />
        <Route path="/shop" element={<ShoppingPage />} />
        <Route path="/collections" element={<CollectionsPage />} />
        <Route path="/collections/:collectionId" element={<CollectionPage />} />
        <Route path="/sustainability" element={<SustainabilityPage />} />
        <Route path="/new-arrivals" element={<NewArrivalsPage />} />
        <Route path="/products/:productId" element={<ProductPage />} />
        <Route path="/my-shopping-cart" element={<ShoppingCartPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/promo" element={<PromotionsPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
      </Route>
    )
  );

  return(
    
      <RouterProvider router={route} />

  ) 
};

export default App;
