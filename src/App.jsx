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
import { useContext, useState } from "react";
import Books from "./user/pages/Books";
import PaymentSuccess from "./user/pages/PaymentSuccess";
import PaymentFail from "./user/pages/PaymentFail";
import { routeContext } from "./contextApi/RouteGuard";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const {role, setRole, authorisedUser, setAuthorisedUser}=useContext(routeContext)
  setTimeout(() => {
    setIsLoading(false);
  }, 6000);
  return (
    <>
      <Routes>
        <Route path='/' element={isLoading?<Preloader/>:<Home/>}/>

        <Route path="/contact" element={<Contact />} />
        
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth insideRegister/>} />

        { 
        role=="user" &&
        <>
          <Route path="/books" element={<Books />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/book/:id" element={<View />} />
        <Route path="/success" element={<PaymentSuccess />} />
        <Route path="/fail" element={<PaymentFail/>} />
        </>
        }
{role=="admin" &&
  <>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/resources" element={<AdminResource />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
</>
}
        <Route path="/*" element={<Pnf />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
