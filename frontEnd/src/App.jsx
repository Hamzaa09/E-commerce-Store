import LandingPage from "./Pages/Landing/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CollectionsPage from "./Pages/Collections/CollectionsPage";
import BlogsPage from "./Pages/Blogs/BlogsPage";
import ContactPage from "./Pages/Contact/ContactPage";
import ShopPage from "./Pages/Shop/ShopPage";
import SneakersPage from "./Pages/Sneakers/SneakersPage";
import CartPage from "./Pages/Cart/CartPage";
import LoginPage from "./Authentication/LoginPage";
import User from "./Authentication/User";
import SignUpPage from "./Authentication/SignUpPage";
import SingleProductPage from "./Pages/SingleProduct/SingleProductPage";
import NoPage from "./Pages/NoPage/NoPage";
import UserManagementPage from "./Admin/UserManagementPage";
import DashBoardManagementPage from "./Admin/DashBoardManagementPage";
import ProductsManagementPage from "./Admin/ProductsManagementPage";
import OrdersManagementPage from "./Admin/OrdersManagementPage";
import InquiriesManagementPage from "./Admin/InquiriesManagementPage";
import ContentManagementPage from "./Admin/ContentManagementPage";
import ProtectedRoute from "../utilities/ProtectedRoute";
import AdminProtectedRoute from "../utilities/AdminProtectedRoute";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShopChilds from "./Pages/Shop/ShopChilds";
import SneakersChild from "./Pages/Sneakers/SneakersChild";
import BlogsManagement from "./Admin/BlogsManagement";
import SuccessPage from "./Pages/SuccessPage";
import CancelPage from "./Pages/CancelPage";
import Policies from "./Pages/Footer/Policies";
import { getUserThunk } from "../store/users/user.thunk";
import { getAllProductThunk } from "../store/products/product.thunk";
import "@n8n/chat/style.css";
import { createChat } from "@n8n/chat";
import "./index.css";

function App() {
  useEffect(() => {
    const handleScroll = () => {
      const chatWrapper = document.querySelector(".chat-window-wrapper");
      if (chatWrapper) {
        if (window.scrollY >= 400) {
          chatWrapper.classList.add("scrolled");
        } else {
          chatWrapper.classList.remove("scrolled");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    createChat({
      webhookUrl: import.meta.env.VITE_CHAT_WEBHOOK_URL,
      initialMessages: ["Hello! How can I assist you today?"],
      i18n: {
        en: {
          title: "Site Assistant",
          subtitle: "Ask me anything about JogKar!",
          footer: "",
          getStarted: "New Conversation",
          inputPlaceholder: "Type your question..",
        },
      },
    });
  }, []);

  const dispatch = useDispatch();
  const { userProfile } = useSelector((state) => state.userSlice);

  useEffect(() => {
    dispatch(getUserThunk());
    dispatch(getAllProductThunk());
  }, [dispatch]);

  return (
    <>
      <div>
        <Toaster />
      </div>

      <BrowserRouter>
        <Routes>
          {/* Protected Routes  */}
          <Route element={<ProtectedRoute />}>
            <Route path="/user" element={<User />}></Route>
            <Route path="/cart" element={<CartPage />}></Route>
          </Route>

          {/* Public Routes */}
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/collections" element={<CollectionsPage />}></Route>
          <Route path="/blogs" element={<BlogsPage />}></Route>
          <Route path="/contact" element={<ContactPage />}></Route>
          <Route path="/shop" element={<ShopPage />}></Route>
          <Route path="/shop/:category" element={<ShopChilds />}></Route>
          <Route path="/sneakers" element={<SneakersPage />}></Route>
          <Route path="/sneakers/:category" element={<SneakersChild />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/signup" element={<SignUpPage />}></Route>
          <Route path="/footer/:policies" element={<Policies />}></Route>
          <Route
            path="/singleProduct/:id"
            element={<SingleProductPage />}
          ></Route>
          <Route path="/success" element={<SuccessPage />}></Route>
          <Route path="/cancel" element={<CancelPage />}></Route>
          <Route path="*" element={<NoPage />}></Route>

          {/* Admin Routes  */}
          <Route
            path="/admin"
            element={<AdminProtectedRoute role={userProfile?.role} />}
          >
            <Route
              path="dashboard"
              element={<DashBoardManagementPage />}
            ></Route>
            <Route
              path="usersManagement"
              element={<UserManagementPage />}
            ></Route>
            <Route
              path="productsManagement"
              element={<ProductsManagementPage />}
            ></Route>
            <Route
              path="ordersManagement"
              element={<OrdersManagementPage />}
            ></Route>
            <Route
              path="inquiriesManagement"
              element={<InquiriesManagementPage />}
            ></Route>
            <Route
              path="contentManagement"
              element={<ContentManagementPage />}
            ></Route>
            <Route path="blogsManagement" element={<BlogsManagement />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
