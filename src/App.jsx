import { Route, Routes } from "react-router-dom";
import "./App.css";
import Contact from "./user/pages/Contact";
import Home from "./user/pages/Home";
import Profile from "./user/pages/Profile";
import View from "./user/pages/View";

import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminResource from "./admin/pages/AdminResource";
import AdminSettings from "./admin/pages/AdminSettings";

import Auth from "./pages/Auth";
import Pnf from "./pages/Pnf";

import Preloader from "./component/Preloader";
import Footer from "./component/Footer";
import { useState } from "react";
import Books from "./user/pages/Books";
import PaymentSuccess from "./user/pages/PaymentSuccess";
import PaymentFail from "./user/pages/PaymentFail";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  setTimeout(() => {
    setIsLoading(false);
  }, 6000);
  return (
    <>
      <Routes>
        <Route path='/' element={isLoading?<Preloader/>:<Home/>}/>

        <Route path="/contact" element={<Contact />} />
        <Route path="/books" element={<Books />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth insideRegister/>} />

        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/book/:id" element={<View />} />
        <Route path="/success" element={<PaymentSuccess />} />
        <Route path="/fail" element={<PaymentFail/>} />

        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/resources" element={<AdminResource />} />
        <Route path="/admin/settings" element={<AdminSettings />} />

        <Route path="/*" element={<Pnf />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
