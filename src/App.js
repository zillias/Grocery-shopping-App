import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import CartPage from "./components/CartPage";
import HomePage from "./components/HomePage";
import MobileDeliveryInfo from "./components/MobileDeliveryInfo";
import MobilePayment from "./components/MobilePayment";
import Navbar from "./components/Navbar";
import OpeningPage from "./components/OpeningPage";
import OrdersPage from "./components/OrdersPage";
import ProductPage from "./components/ProductPage";
import RegisterPage from "./components/RegisterPage";
import SignInPage from "./components/SignInPage";
import WhishList from "./components/WhishList";
import { Context } from "./components/Context";
import DiscountsPage from "./components/DiscountsPage";
import ProfilePage from "./components/ProfilePage";

function App() {
  return (
    <Context>
      <Routes>
        <Route path="/" element={<OpeningPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<Navbar />}>
          <Route index element={<HomePage />} />
          <Route path="product/:id" element={<ProductPage />} />
          <Route path="cart">
            <Route index element={<CartPage />} />
            <Route path="deliveryInfo" element={<MobileDeliveryInfo />} />
            <Route path="payment" element={<MobilePayment />} />
          </Route>
          <Route path="orders" element={<OrdersPage />} />
          <Route path="wishlist" element={<WhishList />} />
          <Route path="discounts/:category" element={<DiscountsPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
        <Route
          path="*"
          element={<h1 className="error404">404 Page Not Found</h1>}
        />
      </Routes>
    </Context>
  );
}

export default App;
