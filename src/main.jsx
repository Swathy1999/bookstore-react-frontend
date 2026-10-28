import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import ShareContext from "./contextApi/ShareContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId="730424603645-42eolu0p7pmn1smf5idgr4h0ju0om39m.apps.googleusercontent.com">
        <ShareContext>
           <App />
        </ShareContext>
       
        </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
